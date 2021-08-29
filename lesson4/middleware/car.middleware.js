const { statusCodes, errorMessages } = require('../constans')
const ErrorHandler = require("../errors/error.messages");

module.exports = {
    carCheckId: (req, res, next) => {
        try {
            const { carId } = req.params;

            if (carId.length !== 24) {
                throw new ErrorHandler(errorMessages.WRONG_ID.en, statusCodes.BAD_REQUEST);
            }

            next();
        } catch (e) {
           next(e);
        }
    },

    isCarTrue: (req, res, next) => {
        try {
            const { model, price } = req.body;

            if (!model) {
                throw new ErrorHandler(errorMessages.NOT_VALID_MODEL.en, statusCodes.BAD_REQUEST);
            }

            if (price < 0 || !Number.isInteger(price)) {
                throw new ErrorHandler(errorMessages.NOT_VALID_PRICE.en, statusCodes.BAD_REQUEST);
            }

            next();
        } catch (e) {
           next(e);
        }
    }
};
