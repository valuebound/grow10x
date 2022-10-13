const { reminderCron, IndividualWeeklySummaryCron, companyWeeklyCron } = require("./cron.service");
const cron = require('node-cron');
const { customLogger } = require("../utility/logger");

async function initateCronService() {
    /**
     * Scheduled At Everyday 9pm.
     */
    cron.schedule('00 21 * * *', async() => {
        customLogger.log('info', 'Initaited Cron Service by 9 pm schedule.');
        await reminderCron();
        await IndividualWeeklySummaryCron();
        await companyWeeklyCron();
    },
    {
        timezone: "Asia/Calcutta"
    });
}

async function runCronWhenNotificationUpdates() {
    customLogger.log('info', 'Initaited Cron Service by Update Notification Settings.');
    await reminderCron();
    await IndividualWeeklySummaryCron();
    await companyWeeklyCron();
}

module.exports = { initateCronService, runCronWhenNotificationUpdates }