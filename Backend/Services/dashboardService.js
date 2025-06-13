import asyncHandler from "../middlewares/Asynchandler.js";
import { getOrCreateDashboard } from "../utility/dashboardUtils.js";
export const updateOnFileUpload = asyncHandler(async (userId, fileType = "raw", status = "approved") => {
    const dashboard = await getOrCreateDashboard(userId);

    // Totals
    dashboard.totalFilesUploaded += 1;

    // Activity log
    const today = new Date().toDateString();
    const existing = dashboard.activityLog.find(a => new Date(a.date).toDateString() === today);
    if (existing) existing.uploads += 1;
    else dashboard.activityLog.push({ date: new Date(), uploads: 1 });

    // uploadsVsTopUsers
    dashboard.uploadsVsTopUsers.currentUserUploads += 1;
    const existingUploader = dashboard.uploadsVsTopUsers.topUploaders.find(
        u => u.userId.toString() === userId.toString()
    );
    if (existingUploader) existingUploader.uploadCount += 1;
    else dashboard.uploadsVsTopUsers.topUploaders.push({ userId, uploadCount: 1 });

    // uploadVsAI
    dashboard.uploadVsAI.push({ timestamp: new Date(), uploads: 1, aiSummaries: 0 });

    // timeBasedUsage
    dashboard.timeBasedUsage.push({ interval: "daily", uploads: 1, summaries: 0 });

    // adminStats.fileApprovalBreakdown
    let fileApproval = dashboard.adminStats.fileApprovalBreakdown.find(
        entry => entry.userId.toString() === userId.toString()
    );
    if (!fileApproval) {
        fileApproval = { userId, approved: 0, pending: 0, rejected: 0 };
        dashboard.adminStats.fileApprovalBreakdown.push(fileApproval);
    }
    if (status in fileApproval) fileApproval[status] += 1;

    // adminStats.fileTypesByUser
    let fileTypeEntry = dashboard.adminStats.fileTypesByUser.find(
        entry => entry.userId.toString() === userId.toString()
    );
    if (!fileTypeEntry) {
        fileTypeEntry = {
            userId,
            typeCounts: { image: 0, raw: 0 }
        };
        dashboard.adminStats.fileTypesByUser.push(fileTypeEntry);
    }
    if (fileType in fileTypeEntry.typeCounts) fileTypeEntry.typeCounts[fileType] += 1;

    // adminStats.top10ByActivity
    let topActivity = dashboard.adminStats.top10ByActivity.find(
        u => u.userId.toString() === userId.toString()
    );
    if (!topActivity) {
        topActivity = { userId, uploads: 0, aiTasks: 0, referrals: 0 };
        dashboard.adminStats.top10ByActivity.push(topActivity);
    }
    topActivity.uploads += 1;

    await dashboard.save();
});

export const updateOnAISummary = asyncHandler(async (userId) => {
    const dashboard = await getOrCreateDashboard(userId);

    dashboard.totalAISummaries += 1;

    const today = new Date().toDateString();
    const existing = dashboard.activityLog.find(a => new Date(a.date).toDateString() === today);
    if (existing) existing.aiTasks += 1;
    else dashboard.activityLog.push({ date: new Date(), aiTasks: 1 });

    dashboard.uploadVsAI.push({ timestamp: new Date(), uploads: 0, aiSummaries: 1 });

    dashboard.timeBasedUsage.push({ interval: "daily", uploads: 0, summaries: 1 });

    // adminStats.top10ByActivity
    let topActivity = dashboard.adminStats.top10ByActivity.find(
        u => u.userId.toString() === userId.toString()
    );
    if (!topActivity) {
        topActivity = { userId, uploads: 0, aiTasks: 0, referrals: 0 };
        dashboard.adminStats.top10ByActivity.push(topActivity);
    }
    topActivity.aiTasks += 1;

    await dashboard.save();
});

export const updateOnReferral = asyncHandler(async (referrerUserId) => {
    const dashboard = await getOrCreateDashboard(referrerUserId);

    dashboard.totalReferrals += 1;

    const today = new Date().toDateString();
    const existing = dashboard.activityLog.find(a => new Date(a.date).toDateString() === today);
    if (existing) existing.referrals += 1;
    else dashboard.activityLog.push({ date: new Date(), referrals: 1 });

    // adminStats.topReferredUsers
    const existingUser = dashboard.adminStats.topReferredUsers?.find(
        item => item.userId.toString() === referrerUserId.toString()
    );
    if (existingUser) existingUser.referralCount += 1;
    else dashboard.adminStats.topReferredUsers.push({ userId: referrerUserId, referralCount: 1 });

    // adminStats.dailyUserGrowth
    dashboard.adminStats.dailyUserGrowth.push({
        date: new Date(),
        newUsers: 0,
        newReferrals: 1,
    });

    // adminStats.top10ByActivity
    let topActivity = dashboard.adminStats.top10ByActivity.find(
        u => u.userId.toString() === referrerUserId.toString()
    );
    if (!topActivity) {
        topActivity = { userId: referrerUserId, uploads: 0, aiTasks: 0, referrals: 0 };
        dashboard.adminStats.top10ByActivity.push(topActivity);
    }
    topActivity.referrals += 1;

    await dashboard.save();
});
