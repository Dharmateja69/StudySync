// File: controllers/adminController.js

import asyncHandler from "../middlewares/Asynchandler.js";
import Files from "../Model/Files.js";
import { User } from "../Model/User.js";
import { updateUserPoints, updateUserUploadCount } from "../utility/leaderboardUtils.js";

export const getPendingFiles = asyncHandler(async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const pendingFiles = await Files.find({ status: "pending" })
            .sort({ createdAt: -1 })
            .populate("uploadedBy", "fullName email");

        res.json(pendingFiles);
    } catch (err) {
        console.error("Error fetching pending files:", err);
        res.status(500).json({ message: "Server Error" });
    }
});

export const getapprovedFiles = asyncHandler(async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const approved = await Files.find({ status: "approved" })
            .sort({ createdAt: -1 })
            .populate("uploadedBy", "fullName email");

        res.json(approved);
    } catch (err) {
        console.error("Error fetching pending files:", err);
        res.status(500).json({ message: "Server Error" });
    }
});

export const getrejectedFiles = asyncHandler(async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const approved = await Files.find({ status: "rejected" })
            .sort({ createdAt: -1 })
            .populate("uploadedBy", "fullName email");

        res.json(approved);
    } catch (err) {
        console.error("Error fetching pending files:", err);
        res.status(500).json({ message: "Server Error" });
    }
});


export const approveFile = asyncHandler(async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const file = await Files.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        if (file.status !== "pending") {
            return res.status(400).json({ message: "File is already reviewed" });
        }

        file.status = "approved";
        file.adminActionBy = req.user._id;
        await file.save();

        const user = await User.findById(file.uploadedBy);
        if (!user) {
            return res.status(404).json({ message: "Uploader not found" });
        }

        // Increment verified upload count
        user.verifiedUploadCount += 1;
        user.totalCredits += 10;

        // Bonus for every 5 uploads
        if (user.verifiedUploadCount % 5 === 0) {
            user.totalCredits += 25;
        }

        // Referral Bonus — only once on first verified upload
        if (user.verifiedUploadCount === 1 && user.referredBy) {
            const referrer = await User.findById(user.referredBy);
            if (referrer) {
                referrer.totalCredits += 15;
                referrer.referralCount += 1;
                await referrer.save();
            }
        }
        await updateUserUploadCount(file.uploadedBy, 1);
        await user.save();

        return res.json({ message: "File approved and credits granted" });
    } catch (err) {
        console.error("Approval error:", err);
        return res.status(500).json({ message: "Server Error" });
    }
});

export const rejectFile = asyncHandler(async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const file = await Files.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        if (file.status !== "pending") {
            return res.status(400).json({ message: "File is already reviewed" });
        }

        file.status = "rejected";
        file.rejectionReason = req.body.reason || "No reason provided";
        file.adminActionBy = req.user._id;
        const wasApproved = file?.status === "approved";
        if (wasApproved) {
            await updateUserUploadCount(file.uploadedBy, -1);
            // Also remove the points that were awarded for the upload
            await updateUserPoints(file.uploadedBy, -10);
        }
        await file.save();

        return res.json({ message: "File rejected successfully" });
    } catch (err) {
        console.error("Rejection error:", err);
        return res.status(500).json({ message: "Server Error" });
    }
});

export const getAllUsers = asyncHandler(async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const users = await User.find({}, {
            email: 1,
            fullName: 1,
            role: 1,
            isVerified: 1,
            isDeleted: 1,
            createdAt: 1,
        }).sort({ createdAt: -1 });

        return res.json({ users });
    } catch (error) {
        console.error("Get Users Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});
export const getallfiles = asyncHandler(async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Get all files and populate uploadedBy info
        const files = await Files.find({})
            .sort({ createdAt: -1 })
            .populate("uploadedBy", "fullName email");

        return res.json({ files });
    } catch (error) {
        console.error("Get Files Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

