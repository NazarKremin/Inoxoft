const { statusCodes, errorMessages } = require('../constans')
const ErrorHandler = require("../errors/error.messages");
const {carValidators} = require('../validators');


module.exports = {
    carCheckId: (req, res, next) => {
        try {
            const { carId } = req.params;

            if (carId.length !== 24) next(new ErrorHandler(errorMessages.WRONG_ID.en, statusCodes.BAD_REQUEST));

            next();
        } catch (e) {
           next(e);
        }
    },

    isCarTrue: (req, res, next) => {
        try {
            const { model, price } = req.body;

            if (!model) next(new ErrorHandler(errorMessages.NOT_VALID_MODEL.en, statusCodes.BAD_REQUEST));

            if (price < 0 || !Number.isInteger(price)) next( new ErrorHandler(errorMessages.NOT_VALID_PRICE.en, statusCodes.BAD_REQUEST));

            next();
        } catch (e) {
           next(e);
        }
    },

    checkCarValidation: (req, res, next) => {
        try {
            const { error } = carValidators.createCarValidator.valid(req.body);

            if (error) next(new ErrorHandler(statusCodes.BAD_REQUEST, errorMessages.NOT_VALID_MODEL.en || errorMessages.NOT_VALID_PRICE.en));

            next();
        } catch (e) {
           next(e);
        }
    }
};
