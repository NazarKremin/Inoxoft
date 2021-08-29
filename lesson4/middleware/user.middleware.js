const { statusCodes, errorMessages } = require('../constans')
const ErrorHandler = require("../errors/error.messages");

module.exports = {

    isUserTrue: (req, res, next) => {
        try {
            const {name, email, preferL = 'en'} = req.body;

            if (email.length < 8) {
                throw new ErrorHandler(errorMessages.EMAIL_IS_WRONG[preferL], statusCodes.BAD_REQUEST);
            }

            if (!name || email) {
                throw new ErrorHandler(errorMessages.HERE_NOTHING[preferL], statusCodes.METHOD_NOT_ALLOWED);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    userCheckId: (req, res, next) => {
        try {
            const userId = +req.params.userId;

            if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
                throw new ErrorHandler(errorMessages.WRONG_ID.en , statusCodes.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserHave: (req, res, next) => {
        try {
            const {email} = req.body;

            if (!email) {
                throw new ErrorHandler(errorMessages.EMAIL_ALLREADY_USE.en, statusCodes.CONFLICT);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
