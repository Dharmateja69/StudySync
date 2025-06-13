import { Schema, model } from "mongoose";

const leaderboardSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, // One leaderboard entry per user
        },

        // Cached data for performance (updated in real-time)
        totalPoints: {
            type: Number,
            default: 0,
            index: true, // Index for sorting
        },

        uploadCount: {
            type: Number,
            default: 0,
            index: true,
        },

        referralCount: {
            type: Number,
            default: 0,
            index: true,
        },

        // Badge assignment based on points
        badge: {
            type: String,
            enum: ["bronze", "gold", "platinum", "none"],
            default: "none",
            index: true,
        },

        // Ranking position (updated when leaderboard changes)
        rank: {
            type: Number,
            default: 0,

        },

        // Last activity to track engagement
        lastActivityAt: {
            type: Date,
            default: Date.now,
        },

        // For tracking changes and real-time updates
        lastUpdatedAt: {
            type: Date,
            default: Date.now,
        },

        // Additional metrics for comprehensive ranking
        totalDownloads: {
            type: Number,
            default: 0,
        },

        totalViews: {
            type: Number,
            default: 0,
        },

        // Status for active/inactive users
        isActive: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
    }
);

// Compound index for efficient sorting and pagination
leaderboardSchema.index({
    totalPoints: -1,
    uploadCount: -1,
    referralCount: -1,
    createdAt: -1
});

// Index for rank-based queries
leaderboardSchema.index({ rank: 1 });

// Method to calculate and assign badge
leaderboardSchema.methods.calculateBadge = function () {
    if (this.totalPoints >= 1000) {
        this.badge = "platinum";
    } else if (this.totalPoints >= 500) {
        this.badge = "gold";
    } else if (this.totalPoints >= 100) {
        this.badge = "bronze";
    } else {
        this.badge = "none";
    }
    return this.badge;
};

// Static method to update user's leaderboard entry
leaderboardSchema.statics.updateUserStats = async function (userId, updateData) {
    try {
        let entry = await this.findOne({ user: userId });

        if (!entry) {
            entry = new this({
                user: userId,
                ...updateData,
                lastUpdatedAt: new Date(),
                lastActivityAt: new Date(),
                isActive: true
            });
        } else {
            Object.assign(entry, {
                ...updateData,
                lastUpdatedAt: new Date(),
                lastActivityAt: new Date(),
                isActive: true
            });
        }

        entry.calculateBadge(); // Ensure badge is correctly set based on totalPoints
        await entry.save();

        return entry;
    } catch (error) {
        throw new Error(`Failed to update leaderboard stats: ${error.message}`);
    }
};


// Static method to recalculate all ranks
leaderboardSchema.statics.recalculateRanks = async function () {
    try {
        const entries = await this.find({ isActive: true })
            .sort({
                totalPoints: -1,
                uploadCount: -1,
                referralCount: -1,
                createdAt: -1
            });

        const bulkOps = entries.map((entry, index) => ({
            updateOne: {
                filter: { _id: entry._id },
                update: { rank: index + 1 }
            }
        }));

        if (bulkOps.length > 0) {
            await this.bulkWrite(bulkOps);
        }

        return entries.length;
    } catch (error) {
        throw new Error(`Failed to recalculate ranks: ${error.message}`);
    }
};

export default model("Leaderboard", leaderboardSchema);