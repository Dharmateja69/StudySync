// /controllers/fileController.js

import cloudinary from "../config/cloudinary.js";
import asyncHandler from "../middlewares/Asynchandler.js";
import { default as File, default as Files } from "../Model/Files.js";
import { updateOnFileUpload } from "../Services/dashboardService.js";



export const uploadFileController = asyncHandler(async (req, res) => {
    try {
        const { title, subject, semester, description, university, tags } = req.body;
        const file = req.file;
        const userId = req.user._id;
        const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
        if (!file) return res.status(400).json({ error: "File is required" });
        if (!title || !subject || !semester) {
            return res.status(400).json({ error: "Title, subject, and semester are required" });
        }
        const resourceType = file.mimetype === "application/pdf" ? "raw" : "image";

        const newFile = await File.create({
            uploadedBy: req.user._id,
            title,
            description,
            subject,
            semester,
            university,
            tags: tagsArray,
            cloudinaryUrl: file.path,
            cloudinaryPublicId: file.filename,
            resourceType,

        });
        await updateOnFileUpload(userId);

        res.status(201).json({
            message: "File uploaded successfully & dashboard updated.'",
            data: newFile,
        });
    } catch (err) {
        res.status(500).json({ error: err.message || "Failed to upload file" });
    }
});
export const getFileById = asyncHandler(async (req, res) => {
    try {
        const file = await File.findById(req.params.id).populate("uploadedBy", "name email");

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        res.status(200).json(file);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
export const updateFile = asyncHandler(async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        if (file.uploadedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const updatableFields = ["title", "description", "subject", "semester", "university", "tags"];
        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                file[field] = req.body[field];
            }
        });

        const updatedFile = await file.save();
        res.status(200).json(updatedFile);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

export const deleteFile = asyncHandler(async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        if (file.uploadedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // 🔍 Cloudinary delete
        const cloudinaryResponse = await cloudinary.uploader.destroy(file.cloudinaryPublicId, {
            resource_type: "image" // fallback
        });

        console.log("Cloudinary Deletion Response:", cloudinaryResponse);

        if (cloudinaryResponse.result !== "ok") {
            return res.status(500).json({
                message: "Failed to delete file from Cloudinary",
                cloudinaryResponse,
            });
        }

        // ✅ Delete from MongoDB only after Cloudinary confirms deletion
        await File.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "File deleted successfully from Cloudinary and Database",
            cloudinaryResponse,
        });
    } catch (error) {
        console.error("Delete File Error:", error);
        res.status(500).json({
            message: "Server error during file deletion",
            error: error.message || "Unknown error",
        });
    }
});

export const getUserUploads = asyncHandler(async (req, res) => {
    try {
        const files = await File.find({ uploadedBy: req.user._id }).sort({ createdAt: -1 });

        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

export const Globalsearch = asyncHandler(async (req, res) => {
    try {
        const { tag, title, sort = "newest" } = req.query;

        const query = { status: "approved" };

        if (tag) query.tags = tag;
        if (title) query.title = { $regex: title, $options: "i" };

        const sortOptions = {
            newest: { createdAt: -1 },
            oldest: { createdAt: 1 },
            title_asc: { title: 1 },
            title_desc: { title: -1 }
        };

        const files = await Files.find(query)
            .sort(sortOptions[sort] || sortOptions.newest);

        res.status(200).json({
            success: true,
            count: files.length,
            data: files
        });
    } catch (err) {
        console.error("Search API Error:", err);
        res.status(500).json({ success: false, message: "Search failed." });
    }
});