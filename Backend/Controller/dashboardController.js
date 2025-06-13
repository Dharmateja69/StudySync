import asyncHandler from "../middlewares/Asynchandler.js";
import Dashboard from "../Model/Dashboard.js";
import { User } from "../Model/User.js";


export const getUserDashboard = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        const dashboard = await Dashboard.findOne({ user: userId }).lean();

        if (!dashboard) {
            return res.status(404).json({ message: 'Dashboard not found for this user.' });
        }

        res.status(200).json(dashboard);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch dashboard data.' });
    }
});




// Needed for extended metrics

export const getAdminOverview = asyncHandler(async (req, res) => {
    try {
        const dashboards = await Dashboard.find().lean();
        const totalUsers = await User.countDocuments();

        const userRoleCountsAgg = await User.aggregate([
            { $group: { _id: "$role", count: { $sum: 1 } } }
        ]);

        const userRoleCounts = {};
        userRoleCountsAgg.forEach(item => {
            userRoleCounts[item._id] = item.count;
        });

        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        const newUsersLast7Days = await User.countDocuments({ createdAt: { $gte: lastWeek } });

        const totals = {
            totalFilesUploaded: 0,
            totalAISummaries: 0,
            totalReferrals: 0,
            userStatusCounts: {
                approved: 0,
                pending: 0,
                rejected: 0
            }
        };

        dashboards.forEach(d => {
            totals.totalFilesUploaded += d.totalFilesUploaded || 0;
            totals.totalAISummaries += d.totalAISummaries || 0;
            totals.totalReferrals += d.totalReferrals || 0;

            // Fix starts here
            if (Array.isArray(d.adminStats?.fileApprovalBreakdown)) {
                d.adminStats.fileApprovalBreakdown.forEach(entry => {
                    totals.userStatusCounts.approved += entry.approved || 0;
                    totals.userStatusCounts.pending += entry.pending || 0;
                    totals.userStatusCounts.rejected += entry.rejected || 0;
                });
            }
        });


        res.status(200).json({
            totals,
            totalUsers,
            userRoleCounts,
            newUsersLast7Days
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch admin overview.' });
    }
});

// ✅ GET /api/dashboard/admin/user/:userId
export const getUserDashboardAdminView = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;

        const dashboard = await Dashboard.findOne({ user: userId }).lean();

        if (!dashboard) {
            return res.status(404).json({ message: 'Dashboard not found for this user.' });
        }

        res.status(200).json(dashboard);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch user dashboard.' });
    }
});
