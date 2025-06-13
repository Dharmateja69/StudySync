import cron from 'node-cron';
import { fullUserSync, recalculateAllRanks } from '../utility/leaderboardUtils.js';

// Run every hour to recalculate ranks
cron.schedule('0 * * * *', async () => {
    try {
        await recalculateAllRanks();
        console.log('Hourly rank recalculation completed');
    } catch (error) {
        console.error('Hourly rank recalculation failed:', error);
    }
});

// Run daily at midnight for full sync
cron.schedule('0 0 * * *', async () => {
    try {
        await fullUserSync();
        console.log('Daily full sync completed');
    } catch (error) {
        console.error('Daily full sync failed:', error);
    }
});