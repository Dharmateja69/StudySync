// dashboardSchema.js (Unified, Computed & Centralized)

import mongoose from 'mongoose';

const dashboardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },

    // ✅ Basic Visualizations
    totalFilesUploaded: {
        type: Number,
        default: 0,
    },
    totalAISummaries: {
        type: Number,
        default: 0,
    },
    totalReferrals: {
        type: Number,
        default: 0,
    },
    activityLog: [
        {
            date: { type: Date, required: true },
            uploads: { type: Number, default: 0 },
            aiTasks: { type: Number, default: 0 },
            referrals: { type: Number, default: 0 },
        }
    ],

    // ⚖️ Medium Complexity Metrics
    uploadsVsTopUsers: {
        currentUserUploads: { type: Number, default: 0 },
        topUploaders: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                uploadCount: { type: Number, default: 0 },
            }
        ]
    },

    timeBasedUsage: [
        {
            interval: { type: String }, // daily, weekly, etc.
            uploads: { type: Number },
            summaries: { type: Number },
            timestamp: { type: Date, default: Date.now },
        }
    ],

    uploadVsAI: [
        {
            timestamp: { type: Date, default: Date.now },
            uploads: { type: Number },
            aiSummaries: { type: Number },
        }
    ],

    // 🚨 Admin View (High Complexity)
    adminStats: {
        userStatusCounts: {
            approved: { type: Number, default: 0 },
            pending: { type: Number, default: 0 },
            rejected: { type: Number, default: 0 },
        },
        fileApprovalBreakdown: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                approved: { type: Number },
                pending: { type: Number },
                rejected: { type: Number },
            }
        ],
        fileTypesByUser: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                typeCounts: {
                    image: { type: Number, default: 0 },
                    raw: { type: Number, default: 0 },
                }
            }
        ],
        topReferredUsers: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                referralCount: { type: Number }
            }
        ],
        dailyUserGrowth: [
            {
                date: { type: Date },
                newUsers: { type: Number },
                newReferrals: { type: Number },
            }
        ],
        top10ByActivity: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                uploads: { type: Number },
                aiTasks: { type: Number },
                referrals: { type: Number },
            }
        ]
    }

}, { timestamps: true });

export default mongoose.model('Dashboard', dashboardSchema);
