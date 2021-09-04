const bcrypt = require('bcrypt');
const { statusCodes, errorMessages } = require('../constans')
const ErrorHandler = require("../errors/error.messages");

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const isPasswordEquals = await bcrypt.compare(password, hashPassword);

        if (!isPasswordEquals) {
            throw new ErrorHandler(errorMessages.EMAIL_IS_WRONG.en, statusCodes.BAD_REQUEST);
        }
    }
};