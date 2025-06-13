import express from "express";

import { getLeaderboard, getleaderboardSchemaStats, getTopThree, getUserRank, syncUserStats } from "../Controller/LeasderBoardController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/IsAdmin.js";
// Your existing auth middleware

const router = express.Router();

/**
 * @route   GET /api/leaderboard
 * @desc    Get paginated leaderboard
 * @access  Public
 * @query   ?page=1&limit=10
 */
router.get("/", getLeaderboard);

/**
 * @route   GET /api/leaderboard/top-three
 * @desc    Get top 3 users for hero section
 * @access  Public
 */
router.get("/top-three", getTopThree);

/**
 * @route   GET /api/leaderboard/stats
 * @desc    Get leaderboard statistics and analytics
 * @access  Public
 */
router.get("/stats", getleaderboardSchemaStats);

/**
 * @route   GET /api/leaderboard/my-rank
 * @desc    Get current user's rank and stats
 * @access  Private
 */
router.get("/my-rank", protect
    , getUserRank);

/**
 * @route   POST /api/leaderboard/sync
 * @desc    Sync current user's stats from actual collections
 * @access  Private
 */
router.post("/sync", protect
    , syncUserStats);

/**
 * @route   POST /api/leaderboard/sync/:userId
 * @desc    Sync specific user's stats (Admin only)
 * @access  Private (Admin)
 */
router.post("/sync/:userId", isAdmin
    , syncUserStats);

export default router;