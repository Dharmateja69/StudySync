// routes/searchRoutes.js
import express from 'express';
import { getFileDetails, getSearchSuggestions, searchFiles, trackDownload } from '../Controller/SearchController.js';
import { protect } from '../middlewares/authMiddleware.js';

// Optional auth middleware

const router = express.Router();

// Search files - GET /api/search
// Query parameters: query, subject, semester, university, resourceType, sortBy, page, limit, excludeOwn
router.get('/', protect, searchFiles);

// Get search suggestions - GET /api/search/suggestions?query=...
router.get('/suggestions', getSearchSuggestions);

// Get file details for modal view - GET /api/search/file/:fileId
router.get('/file/:fileId', protect, getFileDetails);

// Track download and get download URL - POST /api/search/download/:fileId
router.post('/download/:fileId', protect, trackDownload);

export default router;