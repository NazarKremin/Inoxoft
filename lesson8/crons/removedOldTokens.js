const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const { O_Auth, ActionToken  } = require('../dataBase/models');
const { constans } = require('../constans');

module.exports = async () => {
    const previousMonth = dayjs.utc(constans.CURRENT_DATE.toString()).subtract(1, 'month');

    await O_Auth.deleteMany({ createdAt: { $lte: previousMonth } });

    await ActionToken.deleteMany({ createdAt: { $lte: previousMonth } });
};