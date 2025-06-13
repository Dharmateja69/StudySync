import asyncHandler from "../middlewares/Asynchandler.js";
import Files from "../Model/Files.js";
import leaderboardSchema from "../Model/leaderboardSchema.js";
import { User } from "../Model/User.js";

// GET: Paginated leaderboard
export const getLeaderboard = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const leaderboardEntries = await leaderboardSchema.find({ isActive: true })
            .populate({
                path: 'user',
                select: 'fullName email  totalCredits verifiedUploadCount referralCount'
            })
            .sort({
                totalPoints: -1,
                uploadCount: -1,
                referralCount: -1,
                createdAt: -1
            })
            .skip(skip)
            .limit(limit)
            .lean();

        const totalEntries = await leaderboardSchema.countDocuments({ isActive: true });
        const totalPages = Math.ceil(totalEntries / limit);

        const formattedEntries = leaderboardEntries.map((entry, index) => ({
            rank: skip + index + 1,
            user: {
                id: entry.user._id,
                fullName: entry.user.fullName,
                email: entry.user.email,
                avatar: entry.user.avatar,
            },
            stats: {
                totalPoints: entry.user.totalCredits,
                uploadCount: entry.user.verifiedUploadCount,
                referralCount: entry.user.referralCount,
                totalDownloads: entry.user.totalDownloads,
                totalViews: entry.user.totalViews,
            },
            badge: entry.badge,
            lastActivityAt: entry.lastActivityAt
        }));

        res.status(200).json({
            success: true,
            data: {
                entries: formattedEntries,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalEntries,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1,
                    limit
                }
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch leaderboard",
            error: error.message
        });
    }
});

// GET: Top 3 users
export const getTopThree = asyncHandler(async (req, res) => {
    try {
        const topThree = await leaderboardSchema.find({ isActive: true })
            .populate({
                path: 'user',
                select: 'fullName email totalCredits verifiedUploadCount referralCount'
            })
            .sort({
                totalPoints: -1,
                uploadCount: -1,
                referralCount: -1,
                createdAt: -1
            })
            .limit(3)
            .lean();

        const formattedTopThree = topThree.map((entry, index) => ({
            rank: index + 1,
            user: {
                id: entry.user._id,
                fullName: entry.user.fullName,
                email: entry.user.email,
                avatar: entry.user.avatar,
            },
            stats: {
                totalPoints: entry.user.totalCredits,
                uploadCount: entry.user.verifiedUploadCount,
                referralCount: entry.user.referralCount,
            },
            badge: entry.badge,
        }));

        res.status(200).json({
            success: true,
            data: {
                topThree: formattedTopThree
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch top three users",
            error: error.message
        });
    }
});

// GET: Current user's rank and stats
export const getUserRank = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;

        const userEntry = await leaderboardSchema.findOne({
            user: userId,
            isActive: true
        }).populate({
            path: 'user',
            select: 'fullName email totalCredits verifiedUploadCount referralCount'
        });

        if (!userEntry) {
            return res.status(404).json({
                success: false,
                message: "User not found in leaderboardSchema"
            });
        }

        const higherRankedCount = await leaderboardSchema.countDocuments({
            isActive: true,
            $or: [
                { totalPoints: { $gt: userEntry.user.totalCredits } },
                {
                    totalPoints: userEntry.user.totalCredits,
                    uploadCount: { $gt: userEntry.user.verifiedUploadCount }
                },
                {
                    totalPoints: userEntry.user.totalCredits,
                    uploadCount: userEntry.user.verifiedUploadCount,
                    referralCount: { $gt: userEntry.user.referralCount }
                }
            ]
        });

        const actualRank = higherRankedCount + 1;

        res.status(200).json({
            success: true,
            data: {
                rank: actualRank,
                user: {
                    id: userEntry.user._id,
                    fullName: userEntry.user.fullName,
                    email: userEntry.user.email,
                    avatar: userEntry.user.avatar,
                },
                stats: {
                    totalPoints: userEntry.user.totalCredits,
                    uploadCount: userEntry.user.verifiedUploadCount,
                    referralCount: userEntry.user.referralCount,
                    totalDownloads: userEntry.totalDownloads,
                    totalViews: userEntry.totalViews,
                },
                badge: userEntry.badge,
                progress: {
                    toNextBadge: calculateProgressToNextBadge(userEntry.user.totalCredits),
                    pointsToNextBadge: calculatePointsToNextBadge(userEntry.user.totalCredits)
                }
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user rank",
            error: error.message
        });
    }
});

// PATCH: Sync user stats
export const syncUserStats = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.userId || req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const fileStats = await Files.aggregate([
            { $match: { uploadedBy: user._id, status: "approved" } },
            {
                $group: {
                    _id: null,
                    uploadCount: { $sum: 1 },
                    totalDownloads: { $sum: "$downloads" },
                    totalViews: { $sum: "$views" }
                }
            }
        ]);



        const stats = {
            totalPoints: user.totalCredits || 0,
            uploadCount: user.verifiedUploadCount || 0,
            referralCount: user.referralCount || 0,
            totalDownloads: fileStats[0]?.totalDownloads || 0,
            totalViews: fileStats[0]?.totalViews || 0,
        };

        const updatedEntry = await leaderboardSchema.updateUserStats(userId, stats);

        res.status(200).json({
            success: true,
            message: "User stats synchronized successfully",
            data: updatedEntry
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to sync user stats",
            error: error.message
        });
    }
});

// Helper: Calculate badge progress
export const calculateProgressToNextBadge = (currentPoints) => {
    if (currentPoints >= 1000) return 100;
    if (currentPoints >= 500) return ((currentPoints - 500) / 500) * 100;
    if (currentPoints >= 100) return ((currentPoints - 100) / 400) * 100;
    return (currentPoints / 100) * 100;
};

// Helper: Points to next badge
export const calculatePointsToNextBadge = (currentPoints) => {
    if (currentPoints >= 1000) return 0;
    if (currentPoints >= 500) return 1000 - currentPoints;
    if (currentPoints >= 100) return 500 - currentPoints;
    return 100 - currentPoints;
};

// GET: leaderboardSchema stats
export const getleaderboardSchemaStats = asyncHandler(async (req, res) => {
    try {
        const stats = await leaderboardSchema.aggregate([
            { $match: { isActive: true } },
            {
                $group: {
                    _id: null,
                    totalUsers: { $sum: 1 },
                    avgPoints: { $avg: "$totalPoints" },
                    avgUploads: { $avg: "$uploadCount" },
                    avgReferrals: { $avg: "$referralCount" },
                    platinumUsers: {
                        $sum: { $cond: [{ $eq: ["$badge", "platinum"] }, 1, 0] }
                    },
                    goldUsers: {
                        $sum: { $cond: [{ $eq: ["$badge", "gold"] }, 1, 0] }
                    },
                    bronzeUsers: {
                        $sum: { $cond: [{ $eq: ["$badge", "bronze"] }, 1, 0] }
                    }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: {
                overview: stats[0] || {
                    totalUsers: 0,
                    avgPoints: 0,
                    avgUploads: 0,
                    avgReferrals: 0,
                    platinumUsers: 0,
                    goldUsers: 0,
                    bronzeUsers: 0
                }
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch leaderboard statistics",
            error: error.message
        });
    }
});
