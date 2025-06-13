// routes/analyticsRoutes.js
import express from 'express';
import { getAdminOverview, getUserDashboard, getUserDashboardAdminView } from '../Controller/dashboardController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/IsAdmin.js';


const router = express.Router();
router.get('/my-dashboard', protect, getUserDashboard);
//admin
router.get('/overview', protect, isAdmin, getAdminOverview);
router.get('/user/:userId', protect, isAdmin, getUserDashboardAdminView);


export default router;
