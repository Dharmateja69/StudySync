
import crypto from "crypto";
import asyncHandler from "../middlewares/Asynchandler.js";
import { User } from "../Model/User.js";
import { updateOnReferral } from "../Services/dashboardService.js";
import { updateUserReferralCount } from "../utility/leaderboardUtils.js";
export const generateReferralLink = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate referralCode if not present
        if (!user.referralCode) {
            const newCode = crypto.randomBytes(4).toString("hex"); // 8-char code
            user.referralCode = newCode;
            await user.save();
        }

        const referralLink = `${process.env.CLIENT_URL || "http://localhost:8080"}/signup?ref=${user.referralCode}`;

        res.status(200).json({
            referralCode: user.referralCode,
            referralLink,
        });

    } catch (error) {
        console.error("Referral Link Error:", error);
        res.status(500).json({ message: "Server error generating referral link" });
    }
});

export const getReferralStats = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch users referred by this user
        const referredUsers = await User.find({ referredBy: userId }).select("fullName email createdAt");

        res.status(200).json({
            totalReferrals: referredUsers.length,
            referredUsers,
        });

    } catch (error) {
        console.error("Referral Stats Error:", error);
        res.status(500).json({ message: "Error fetching referral stats" });
    }
});

export const useReferralCode = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { referralCode } = req.body;

    try {
        if (!referralCode || referralCode.trim() === "") {
            return res.status(400).json({ message: "Referral code is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        if (user.referredBy) {
            return res.status(400).json({ message: "Referral code already used" });
        }

        const referrer = await User.findOne({ referralCode });
        if (!referrer) {
            return res.status(404).json({ message: "Invalid referral code" });
        }

        if (referrer._id.toString() === user._id.toString()) {
            return res.status(400).json({ message: "You cannot use your own referral code" });
        }

        // Update both users
        user.referredBy = referrer._id;
        user.totalCredits += 10;
        await user.save();

        referrer.totalCredits += 20;
        referrer.referralCount += 1;
        await referrer.save();
        await updateOnReferral(referrer._id);
        // 🚀 Update leaderboard for referrer
        await updateUserReferralCount(referrer._id, userId);

        return res.status(200).json({
            message: "Referral code applied successfully  dashboard updated",
            referredBy: {
                _id: referrer._id,
                referralCode: referrer.referralCode,
                totalCredits: referrer.totalCredits,
                referralCount: referrer.referralCount,
            },
        });
    } catch (error) {
        console.error("Referral use error:", error);
        return res.status(500).json({ message: "Server error applying referral code" });
    }
});
