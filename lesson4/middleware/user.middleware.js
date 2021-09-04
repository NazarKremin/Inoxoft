const {statusCodes, errorMessages} = require('../constans')
const {User} = require('../dataBase/models');
const ErrorHandler = require("../errors/error.messages");
const {userValidators} = require('../validators');

module.exports = {

    isUserTrue: (req, res, next) => {
        try {
            const { name, email, preferL = 'en' } = req.body;

            if (email.length < 8) next(new ErrorHandler(statusCodes.BAD_REQUEST, errorMessages.EMAIL_IS_WRONG[preferL]));

            if (!name || email) next(new ErrorHandler(statusCodes.METHOD_NOT_ALLOWED, errorMessages.HERE_NOTHING[preferL]));

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserByIdExists: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await User.findById(userId);

            if (!user) next(new ErrorHandler(statusCodes.BAD_REQUEST, errorMessages.EMAIL_ALLREADY_USE.en))

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserHave: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });

            if (user) next(new ErrorHandler(statusCodes.CONFLICT, errorMessages.EMAIL_ALLREADY_USE.en));

            next();
        } catch (e) {
            next(e);
        }
    },

    checkNewUserValidation: (req, res, next) => {
        try {
            const { error } = userValidators.createUserValidator.registerUserValidator.valid(req.body);

            if (error) next(new ErrorHandler(statusCodes.BAD_REQUEST, errorMessages.USER_NOT_VALID.en));

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUpdateUserValidation: (req, res, next) => {
        try {
            const { error } = userValidators.createUserValidator.updateUserValidator.valid(req.body, req.params);

            if (error) next(new ErrorHandler(statusCodes.BAD_REQUEST, errorMessages.WRONG_ID.en));

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserLogin: (req, res, next) => {
        try {
            const { error } = userValidators.createUserValidator.userLoginValidator.valid(req.body);

            if (error) next(new ErrorHandler(statusCodes.BAD_REQUEST, errorMessages.EMAIL_IS_WRONG.en));

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserById: (req, res, next) => {
        try {
            const { error } = userValidators.createUserValidator.userByIdValidator.valid(req.params);

            if (error) next(new ErrorHandler(statusCodes.BAD_REQUEST, errorMessages.WRONG_ID.en));

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUSerRole: (roles = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!roles.length) return next();

            if (!roles.includes(role)) next(new ErrorHandler(statusCodes.FORBIDDEN, errorMessages.WRONG_NAME.en));

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicPara: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const user = await User.findOne({ [dbField]: value });

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
