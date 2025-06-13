
import Files from "../Model/Files.js";
import leaderboardSchema from "../Model/leaderboardSchema.js";
import Referral from "../Model/Referral.js";
import { User } from "../Model/User.js";


// ✅ Update user's points
export const updateUserPoints = async (userId, pointsToAdd) => {
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $inc: { totalCredits: pointsToAdd } },
            { new: true }
        );
        if (!user) throw new Error("User not found");

        await leaderboardSchema.updateUserStats(userId, {
            totalPoints: user.totalCredits
        });

        console.log(`Updated ${pointsToAdd} points for user ${userId}`);
        return user.totalCredits;
    } catch (error) {
        console.error("Error updating user points:", error);
        throw error;
    }
};

// ✅ Update upload count
export const updateUserUploadCount = async (userId, increment = 1) => {
    try {
        const approvedFileCount = await Files.countDocuments({
            uploadedBy: userId,
            status: "approved"
        });

        await User.findByIdAndUpdate(userId, {
            verifiedUploadCount: approvedFileCount
        });

        await leaderboardSchema.updateUserStats(userId, {
            uploadCount: approvedFileCount
        });

        if (increment > 0) {
            await updateUserPoints(userId, 50 * increment);
        }

        console.log(`Updated upload count for user ${userId}: ${approvedFileCount}`);
        return approvedFileCount;
    } catch (error) {
        console.error("Error updating upload count:", error);
        throw error;
    }
};

// ✅ Update referral count
export const updateUserReferralCount = async (referrerId, referredUserId) => {
    try {
        const referralDoc = await Referral.findOneAndUpdate(
            { user: referrerId },
            {
                $addToSet: {
                    referredUsers: {
                        userId: referredUserId,
                        dateReferred: new Date(),
                        rewardGranted: true
                    }
                },
                $inc: {
                    totalReferrals: 1,
                    rewardsEarned: 1
                }
            },
            { upsert: true, new: true }
        );

        await User.findByIdAndUpdate(referrerId, {
            referralCount: referralDoc.totalReferrals
        });

        await leaderboardSchema.updateUserStats(referrerId, {
            referralCount: referralDoc.totalReferrals
        });

        await updateUserPoints(referrerId, 100);

        console.log(`Updated referral count for user ${referrerId}: ${referralDoc.totalReferrals}`);
        return referralDoc.totalReferrals;
    } catch (error) {
        console.error("Error updating referral count:", error);
        throw error;
    }
};

// ✅ Update file views/downloads
export const updateFileInteraction = async (fileId, type) => {
    try {
        const updateField = type === 'view' ? 'views' : 'downloads';

        const file = await Files.findByIdAndUpdate(
            fileId,
            { $inc: { [updateField]: 1 } },
            { new: true }
        );

        if (!file) throw new Error("File not found");

        const fileStats = await File.aggregate([
            { $match: { uploadedBy: file.uploadedBy, status: "approved" } },
            {
                $group: {
                    _id: null,
                    totalDownloads: { $sum: "$downloads" },
                    totalViews: { $sum: "$views" }
                }
            }
        ]);

        if (fileStats.length > 0) {
            await leaderboardSchema.updateUserStats(file.uploadedBy, {
                totalDownloads: fileStats[0].totalDownloads,
                totalViews: fileStats[0].totalViews
            });

            const pointsToAdd = type === 'download' ? 5 : 1;
            await updateUserPoints(file.uploadedBy, pointsToAdd);
        }

        console.log(`Updated ${type} for file ${fileId}`);
        return file[updateField];
    } catch (error) {
        console.error(`Error updating file ${type}:`, error);
        throw error;
    }
};

// ✅ Full sync for a user
export const fullUserSync = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

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

        const referralStats = await Referral.findOne({ user: user._id });

        const stats = {
            totalPoints: user.totalCredits || 0,
            uploadCount: fileStats[0]?.verifiedUploadCount || 0,
            referralCount: referralStats?.referralCount || 0,
            totalDownloads: fileStats[0]?.totalDownloads || 0,
            totalViews: fileStats[0]?.totalViews || 0
        };

        const updatedEntry = await leaderboardSchema.updateUserStats(userId, stats);
        console.log(`Full sync completed for user ${userId}`);
        return updatedEntry;
    } catch (error) {
        console.error("Error in full user sync:", error);
        throw error;
    }
};

// ✅ Recalculate all ranks
export const recalculateAllRanks = async () => {
    try {
        const updatedCount = await leaderboardSchema.recalculateRanks();
        console.log(`Recalculated ranks for ${updatedCount} users`);
        return updatedCount;
    } catch (error) {
        console.error("Error recalculating ranks:", error);
        throw error;
    }
};

// ✅ Initialize leaderboard entry
export const initializeUser = async (userId) => {
    try {
        const entry = await leaderboardSchema.updateUserStats(userId, {
            totalPoints: 0,
            uploadCount: 0,
            referralCount: 0,
            totalDownloads: 0,
            totalViews: 0
        });

        console.log(`Initialized leaderboard entry for user ${userId}`);
        return entry;
    } catch (error) {
        console.error("Error initializing user:", error);
        throw error;
    }
};
