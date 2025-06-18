// Why?
// Receives user request
// Orchestrates everything: calls extractors → summarizer → responds to frontend
// 📁 controllers/aiSummary.controller.js
// POST /api/summary/upload
import asyncHandler from '../middlewares/Asynchandler.js';
import AISummary from '../Model/AISummarySchema.js';
import AiFile from '../Model/UploadFileforai.js';
import generateSummary from '../Services/aiService.js';
import { updateOnAISummary } from '../Services/dashboardService.js';
import imageExtractor from '../utility/imageExtractor.js';
import pdfExtractor from '../utility/pdfExtractor.js';
import extractTextFromURL from '../utility/urlExtractor.js';



export const uploadSummary = asyncHandler(async (req, res) => {

    try {
        const {
            taskType,              // NEW: 'summary' or 'coding'
            summaryStyle,
            summaryLength,
            summaryFormat,
            contentType,
            language,
            complexity,
            codingStyle,
            codingTaskType
        } = req.body;

        const file = req.file;
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: User ID not found' });
        }

        if (!file || !file.buffer) {
            return res.status(400).json({ error: 'File is required' });
        }

        const savedFile = await AiFile.create({
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            buffer: file.buffer,
            userId,
        });

        const sourceType = file.mimetype.includes('pdf') ? 'pdf' : 'image';

        let extractedText;
        if (sourceType === 'pdf') {
            extractedText = await pdfExtractor(file.buffer);
        } else if (sourceType === 'image') {
            extractedText = await imageExtractor(file.buffer);
        } else {
            return res.status(400).json({ error: 'Unsupported file type' });
        }

        // 📦 Build correct options based on taskType
        const options = taskType === 'summary'
            ? {
                style: summaryStyle,
                length: summaryLength,
                format: summaryFormat,
                contentType,
            }
            : {
                style: codingStyle,
                language,
                taskType: codingTaskType,
                complexity
            };

        const aiSummaryResult = await generateSummary({
            fileBuffer: file.buffer,
            sourceType,
            sourceUrl: '',
            userId,
            fileId: savedFile._id,
            options,
            taskType
        });

        if (!aiSummaryResult || !aiSummaryResult.aiSummary) {
            return res.status(500).json({ error: 'AI summarization failed' });
        }

        // 🧠 Check if summary exists for this fileId to avoid duplicate key error
        let savedSummary = await AISummary.findOne({ fileId: savedFile._id });

        if (savedSummary) {
            // Update existing summary document
            const updateData = {
                userId,
                sourceType,
                extractedText,
                promptUsed: aiSummaryResult.promptUsed,
                aiSummary: aiSummaryResult.aiSummary,
                taskType,
                sourceUrl: '',
            };

            if (taskType === 'summary') {
                Object.assign(updateData, {
                    summaryStyle,
                    summaryLength,
                    summaryFormat,
                });
            } else if (taskType === 'coding') {
                Object.assign(updateData, {
                    language,
                    complexity,
                    codingStyle,
                    codingTaskType,
                });
            } else {
                return res.status(400).json({ error: 'Invalid taskType' });
            }

            savedSummary = await AISummary.findOneAndUpdate(
                { fileId: savedFile._id },
                updateData,
                { new: true }
            );
        } else {
            // Create new summary document
            const createData = {
                fileId: savedFile._id,
                userId,
                sourceType,
                extractedText,
                promptUsed: aiSummaryResult.promptUsed,
                aiSummary: aiSummaryResult.aiSummary,
                taskType,
                sourceUrl: '',
            };

            if (taskType === 'summary') {
                Object.assign(createData, {
                    summaryStyle,
                    summaryLength,
                    summaryFormat,
                });
            } else if (taskType === 'coding') {
                Object.assign(createData, {
                    language,
                    complexity,
                    codingStyle,
                    codingTaskType,
                });
            } else {
                return res.status(400).json({ error: 'Invalid taskType' });
            }

            savedSummary = await AISummary.create(createData);
        }
        await updateOnAISummary(userId);
        return res.status(201).json({
            summaryId: savedSummary._id,
            summary: aiSummaryResult.aiSummary,
            message: 'AI summary created & dashboard updated.'
        });

    } catch (error) {
        console.error('uploadSummary error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST /api/summary/public
export const publicUrlSummary = asyncHandler(async (req, res) => {
    try {
        const {
            sourceUrl,
            summaryStyle,
            summaryLength,
            summaryFormat,
            contentType,
            codingStyle,
            language,
            complexity,
            sourceType = 'link',
            codingTaskType,
            taskType = 'summary',
        } = req.body;

        const userId = req.user._id;

        if (!sourceUrl) {
            return res.status(400).json({ error: 'sourceUrl is required' });
        }

        if (!['summary', 'coding'].includes(taskType)) {
            return res.status(400).json({ error: 'Invalid taskType' });
        }

        // Save the file reference
        const savedFile = await AiFile.create({
            originalname: sourceUrl,
            url: sourceUrl,
            sourceType: 'link',
            userId,
        });

        const extractedText = await extractTextFromURL(sourceUrl);

        // Build options for AI based on task type
        const options = taskType === 'summary'
            ? { style: summaryStyle, length: summaryLength, format: summaryFormat, contentType }
            : { style: codingStyle, language, taskType: codingTaskType, complexity };

        const aiSummaryResult = await generateSummary({
            fileBuffer: null,
            sourceType,
            sourceUrl,
            userId,
            fileId: savedFile._id,
            taskType,
            options
        });

        if (!aiSummaryResult || !aiSummaryResult.aiSummary) {
            return res.status(500).json({ error: 'AI summarization failed' });
        }

        // Build base summary data
        const summaryData = {
            fileId: savedFile._id,
            userId,
            sourceType: 'link',
            extractedText,
            promptUsed: aiSummaryResult.promptUsed,
            aiSummary: aiSummaryResult.aiSummary,
            taskType,
            sourceUrl,
        };

        // Merge based on taskType
        if (taskType === 'summary') {
            Object.assign(summaryData, {
                summaryStyle,
                summaryLength,
                summaryFormat,
                contentType,
            });
        } else {
            Object.assign(summaryData, {
                language,
                complexity,
                codingStyle,
                codingTaskType,
            });
        }

        // 🔄 Upsert to avoid duplicate key error
        const savedSummary = await AISummary.findOneAndUpdate(
            { fileId: savedFile._id },
            { $set: summaryData },
            { new: true, upsert: true }
        );
        await updateOnAISummary(userId);
        return res.status(201).json({
            summaryId: savedSummary._id,
            summary: savedSummary.aiSummary,
            message: 'AI summary created & dashboard updated.'
        });

    } catch (error) {
        console.error('publicUrlSummary error:', error);
        res.status(500).json({ error: 'Internal Server Error ' });
    }
});
// GET /api/summary/:id
export const getSummaryById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const summary = await AISummary.findById(id);

        if (!summary) {
            return res.status(404).json({ error: 'Summary not found' });
        }

        res.json(summary);

    } catch (error) {
        console.error('getSummaryById error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
export const getMySummaries = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id; // Comes from protect middleware

        const summaries = await AISummary.find({ userId }).sort({ createdAt: -1 }).select("_id aiSummary");;

        res.status(200).json(summaries);
    } catch (error) {
        console.error("Error fetching user's AI summaries:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export const deleteAISummary = asyncHandler(async (req, res) => {
    try {
        const summary = await AISummary.findById(req.params.id);

        if (!summary) {
            return res.status(404).json({ message: "Summary not found" });
        }

        // ✅ Check ownership based on userId
        if (!summary.userId || summary.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this summary" });
        }

        await summary.deleteOne();

        res.status(200).json({ message: "Summary deleted successfully" });
    } catch (error) {
        console.error("Delete Summary Error:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
});