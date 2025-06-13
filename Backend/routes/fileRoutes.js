// /routes/fileRoutes.js

import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import { deleteFile, getFileById, getUserUploads, updateFile, uploadFileController } from "../Controller/fileController.js";
import { uploadSingleFile } from "../middlewares/fileUploadMiddleware.js";


const router = express.Router();

router.post("/upload", protect, uploadSingleFile, uploadFileController);
router.get("/:id", protect, getFileById);
router.put("/:id", protect, updateFile);
router.delete("/:id", protect, deleteFile);
router.get("/user/uploads", protect, getUserUploads);


export default router;
