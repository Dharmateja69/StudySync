// controllers/searchController.js

import asyncHandler from "../middlewares/Asynchandler.js";
import Files from "../Model/Files.js";


class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.fileIds = new Set();
    }
}

class SearchTrie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word, fileId) {
        let current = this.root;
        const cleanWord = word.toLowerCase().trim();

        for (let char of cleanWord) {
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
            current.fileIds.add(fileId);
        }
        current.isEndOfWord = true;
    }

    search(prefix) {
        let current = this.root;
        const cleanPrefix = prefix.toLowerCase().trim();

        for (let char of cleanPrefix) {
            if (!current.children[char]) {
                return new Set();
            }
            current = current.children[char];
        }

        return current.fileIds;
    }
}

// In-memory search index (in production, use Redis or Elasticsearch)
let searchIndex = new SearchTrie();

// Initialize search index
const initializeSearchIndex = asyncHandler(async () => {
    try {
        const files = await Files.find({ status: 'approved' })
            .select('_id title description subject tags');

        searchIndex = new SearchTrie();

        files.forEach(file => {
            // Index title words
            file.title.split(/\s+/).forEach(word => {
                if (word.length > 2) {
                    searchIndex.insert(word, file._id.toString());
                }
            });

            // Index description words
            if (file.description) {
                file.description.split(/\s+/).forEach(word => {
                    if (word.length > 2) {
                        searchIndex.insert(word, file._id.toString());
                    }
                });
            }

            // Index subject
            if (file.subject) {
                searchIndex.insert(file.subject, file._id.toString());
            }

            // Index tags
            file.tags.forEach(tag => {
                searchIndex.insert(tag, file._id.toString());
            });
        });

        console.log('Search index initialized successfully');
    } catch (error) {
        console.error('Error initializing search index:', error);
    }
});

// Fuzzy matching using Levenshtein distance
const calculateLevenshteinDistance = (str1, str2) => {
    const matrix = Array(str2.length + 1).fill().map(() => Array(str1.length + 1).fill(0));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
        for (let i = 1; i <= str1.length; i++) {
            if (str1[i - 1] === str2[j - 1]) {
                matrix[j][i] = matrix[j - 1][i - 1];
            } else {
                matrix[j][i] = Math.min(
                    matrix[j - 1][i - 1] + 1,
                    matrix[j][i - 1] + 1,
                    matrix[j - 1][i] + 1
                );
            }
        }
    }

    return matrix[str2.length][str1.length];
};

// Advanced search with multiple strategies
const searchFiles = asyncHandler(async (req, res) => {
    try {
        const {
            query = '',
            subject = '',
            semester = '',
            university = '',
            resourceType = '',
            sortBy = 'relevance',
            page = 1,
            limit = 20,
            excludeOwn = false
        } = req.query;

        const userId = req.user?.id;
        let mongoQuery = { status: 'approved' };
        let matchingFileIds = new Set();

        // 🟢 FILTERS
        if (subject) mongoQuery.subject = new RegExp(subject, 'i');
        if (semester) mongoQuery.semester = new RegExp(semester, 'i');
        if (university) mongoQuery.university = new RegExp(university, 'i');
        if (resourceType) mongoQuery.resourceType = resourceType;

        if (excludeOwn && userId) {
            mongoQuery.uploadedBy = { $ne: userId };
        }

        // 🟢 HANDLE SEARCH QUERY
        if (query.trim()) {
            const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 1);

            // 1️⃣ Exact matches using Trie
            queryWords.forEach(word => {
                const exactMatches = searchIndex.search(word);
                exactMatches.forEach(id => matchingFileIds.add(id));
            });

            // 2️⃣ Fuzzy matches if no exact match found
            if (matchingFileIds.size === 0) {
                const allFiles = await Files.find({ status: 'approved' })
                    .select('_id title description subject tags');

                allFiles.forEach(file => {
                    let relevanceScore = 0;

                    const titleWords = file.title.toLowerCase().split(/\s+/);
                    queryWords.forEach(qWord => {
                        titleWords.forEach(tWord => {
                            const distance = calculateLevenshteinDistance(qWord, tWord);
                            if (distance <= 2 && tWord.length > 3) {
                                relevanceScore += (3 - distance) * 2;
                            }
                        });
                    });

                    file.tags.forEach(tag => {
                        queryWords.forEach(qWord => {
                            const distance = calculateLevenshteinDistance(qWord, tag.toLowerCase());
                            if (distance <= 1) {
                                relevanceScore += (2 - distance) * 1.5;
                            }
                        });
                    });

                    if (relevanceScore > 1) {
                        matchingFileIds.add(file._id.toString());
                    }
                });
            }

            // 3️⃣ If still no matches → return empty
            if (matchingFileIds.size === 0) {
                return res.json({
                    success: true,
                    data: {
                        files: [],
                        pagination: {
                            current: parseInt(page),
                            pages: 0,
                            total: 0,
                            hasNext: false,
                            hasPrev: false
                        }
                    }
                });
            }

            // 4️⃣ Apply _id filter only if query exists
            mongoQuery._id = { $in: Array.from(matchingFileIds) };
        }

        // 🟢 Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // 🟢 Sorting
        let sortOption = {};
        switch (sortBy) {
            case 'recent':
                sortOption.createdAt = -1;
                break;
            case 'popular':
                sortOption.views = -1;
                break;
            case 'downloads':
                sortOption.downloads = -1;
                break;
            default:
                sortOption.createdAt = -1;
        }

        // 🟢 Fetch files and count
        const [files, totalCount] = await Promise.all([
            Files.find(mongoQuery)
                .populate('uploadedBy', 'name')
                .select('-cloudinaryPublicId -adminActionBy -rejectionReason')
                .sort(sortOption)
                .skip(skip)
                .limit(parseInt(limit)),
            Files.countDocuments(mongoQuery)
        ]);

        const anonymizedFiles = files.map(file => ({
            ...file.toObject(),
            uploadedBy: 'Anonymous',
            views: file.views || 0,
            downloads: file.downloads || 0
        }));

        const totalPages = Math.ceil(totalCount / parseInt(limit));

        res.json({
            success: true,
            data: {
                files: anonymizedFiles,
                pagination: {
                    current: parseInt(page),
                    pages: totalPages,
                    total: totalCount,
                    hasNext: parseInt(page) < totalPages,
                    hasPrev: parseInt(page) > 1
                },
                searchQuery: query,
                filters: { subject, semester, university, resourceType }
            }
        });

    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            success: false,
            message: 'Search failed',
            error: error.message
        });
    }
});


// Get file details for modal view
const getFileDetails = asyncHandler(async (req, res) => {
    try {
        const { fileId } = req.params;
        const userId = req.user?.id;

        const file = await Files.findOne({
            _id: fileId,
            status: 'approved'
        }).select('-cloudinaryPublicId -adminActionBy -rejectionReason');

        if (!file) {
            return res.status(404).json({
                success: false,
                message: 'File not found'
            });
        }

        // Increment view count if not the owner
        if (!userId || file.uploadedBy.toString() !== userId) {
            await Files.findByIdAndUpdate(fileId, { $inc: { views: 1 } });
        }

        // Return file details with anonymous uploader
        const fileDetails = {
            ...file.toObject(),
            uploadedBy: 'Anonymous',
            canDownload: true,
            canShare: true
        };

        res.json({
            success: true,
            data: fileDetails
        });

    } catch (error) {
        console.error('Get file details error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get file details',
            error: error.message
        });
    }
});

// Track download
const trackDownload = asyncHandler(async (req, res) => {
    try {
        const { fileId } = req.params;

        const file = await Files.findOneAndUpdate(
            { _id: fileId, status: 'approved' },
            { $inc: { downloads: 1 } },
            { new: true }
        );

        if (!file) {
            return res.status(404).json({
                success: false,
                message: 'File not found'
            });
        }

        res.json({
            success: true,
            data: {
                downloadUrl: file.cloudinaryUrl,
                filename: file.title
            }
        });

    } catch (error) {
        console.error('Track download error:', error);
        res.status(500).json({
            success: false,
            message: 'Download tracking failed',
            error: error.message
        });
    }
});

// Get search suggestions
const getSearchSuggestions = asyncHandler(async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || query.length < 2) {
            return res.json({ success: true, data: [] });
        }

        const suggestions = [];
        const matchingIds = searchIndex.search(query.toLowerCase());

        if (matchingIds.size > 0) {
            const files = await Files.find({
                _id: { $in: Array.from(matchingIds) },
                status: 'approved'
            }).select('title subject tags university description').limit(5);

            files.forEach(file => {
                suggestions.push(file.title);
                if (file.subject && !suggestions.includes(file.subject)) {
                    suggestions.push(file.subject);
                }
                file.tags.forEach(tag => {
                    if (!suggestions.includes(tag)) {
                        suggestions.push(tag);
                    }
                });
            });
        }

        res.json({
            success: true,
            data: suggestions.slice(0, 8) // Limit to 8 suggestions
        });

    } catch (error) {
        console.error('Get suggestions error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get suggestions',
            error: error.message
        });
    }
});

export {
    getFileDetails, getSearchSuggestions,
    initializeSearchIndex, searchFiles, trackDownload
};
