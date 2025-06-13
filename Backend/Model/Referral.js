import { Schema, model } from "mongoose";

const referralSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true, // One referral record per user
    },
    referralCode: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
    },
    referredUsers: [
        {
            userId: { type: Schema.Types.ObjectId, ref: "User" },
            dateReferred: { type: Date, default: Date.now },
            rewardGranted: { type: Boolean, default: false }, // Track if referral reward is applied
        }
    ],
    totalReferrals: { type: Number, default: 0 },
    rewardsEarned: { type: Number, default: 0 }, // Could be points or counts of rewards
    isActive: { type: Boolean, default: true }, // To deactivate referral codes if needed
}, { timestamps: true });

export default model("Referral", referralSchema);
