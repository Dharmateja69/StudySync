// utils/dashboardUtils.js

import Dashboard from "../Model/Dashboard.js";


export const getOrCreateDashboard = async (userId) => {
    let dashboard = await Dashboard.findOne({ user: userId });
    if (!dashboard) {
        dashboard = await Dashboard.create({ user: userId });
    }
    return dashboard;
};
