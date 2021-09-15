const cron = require('node-cron');

const removedOldTokens = require('./removedOldTokens');

module.exports = () => {
    cron.schedule('0 6 * * 1', () => {
        console.log('Cron started');
        removedOldTokens();
        console.log('Cron finished');
    });
};