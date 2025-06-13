import express from 'express';
import multer from 'multer'; // For file uploads
import {
    deleteAISummary,
    getMySummaries,
    getSummaryById,
    publicUrlSummary,
    uploadSummary,
} from '../Controller/AiSummaryController.js';
import { protect } from '../middlewares/authMiddleware.js';
import detectInputMiddleware from '../middlewares/detectInput.middleware.js';

const router = express.Router();  // <-- Add this line

const storage = multer.memoryStorage(); // Use memory storage
const upload = multer({ storage: storage }); // Memory storage multer instance

// Upload PDF/Image file
router.post('/upload', protect, upload.single('file'), detectInputMiddleware, uploadSummary);

// Pass public URL
router.post('/public', protect, detectInputMiddleware, publicUrlSummary);
router.get('/my-summaries', protect, getMySummaries);
// Get saved summary by ID
router.get('/:id', protect, getSummaryById);
// Route to get all summaries for the logged-in user
// DELETE /api/ai/:id
router.delete("/:id", protect, deleteAISummary);


export default router;
