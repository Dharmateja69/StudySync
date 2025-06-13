import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// ✅ Setup multer-storage-cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "study-sync",
        allowed_formats: ["jpg", "jpeg", "png", "pdf"],
        resource_type: "auto",
    },
});

// ✅ Multer with 10MB size limit and file filter
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
        allowedTypes.includes(file.mimetype)
            ? cb(null, true)
            : cb(new Error("Only PDF, JPG, JPEG, and PNG files are allowed"));
    },
});

// ✅ Middleware for uploading single file
export const uploadSingleFile = upload.single("file");
