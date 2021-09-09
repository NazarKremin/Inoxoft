const jwt = require('jsonwebtoken');

const O_Auth = require('../dataBase/models/O_Auth');
const ErrorHandler = require("../errors/error.messages");
const { JWT_SECRET, JWT_REFRESH_SECRET, JWT_FORGOT_PASS_TOKEN } = require('../config');
const { constans, statusCodes, errorMessages} = require('../constans');
const {ActionToken} = require("../dataBase/models");
const {userValidators} = require("../validators");

const validateToken =  (token, typeOfToken = 'access_token') => {
    try {
        const jwtSecretKey = typeOfToken === 'access_token' ? JWT_SECRET : JWT_REFRESH_SECRET;

        jwt.verify(token, jwtSecretKey);
    } catch (e) {
        throw new ErrorHandler(statusCodes.UNAUTHORIZED, errorMessages.INVALID_TOKEN.en);
    }
}

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get(constans.AUTHORIZATION);

            if (!access_token) next(new ErrorHandler(statusCodes.UNAUTHORIZED, errorMessages.TOKEN_REQUIRED.en));

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err)
                    next(new ErrorHandler(statusCodes.UNAUTHORIZED, errorMessages.TOKEN_NOT_VALID.en));
            });

            const tokens = await O_Auth.findOne({ access_token });

            if (!tokens) next(new ErrorHandler(statusCodes.UNAUTHORIZED, errorMessages.TOKEN_NOT_VALID.en));

            console.log(access_token);

            req.currentUser = tokens._user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(constans.AUTHORIZATION);

            if (!token) next(new ErrorHandler(statusCodes.UNAUTHORIZED, errorMessages.TOKEN_NOT_VALID.en));

            await validateToken(token, 'refresh_token');

            const dataBaseRefreshToken = await O_Auth.findOne({ refresh_token: token });

            if (!dataBaseRefreshToken) next(new ErrorHandler(statusCodes.UNAUTHORIZED, errorMessages.INVALID_TOKEN));

            req.currentUser = dataBaseRefreshToken.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: (tokenType) => async (req, res, next) => {
        try {
            const forgot_token = req.get(constans.AUTHORIZATION);

            if (!forgot_token) next(new ErrorHandler(statusCodes.UNAUTHORIZED, errorMessages.TOKEN_REQUIRED.en));

            jwt.verify(forgot_token, JWT_FORGOT_PASS_TOKEN , (err) => {
                if (err)
                    next(new ErrorHandler(statusCodes.UNAUTHORIZED, errorMessages.TOKEN_NOT_VALID.en));
            });

            // await tokenizer.verifyActionToken(tokenType, forgot_token);

            const tokens = await ActionToken.findOne({ forgot_token });

            if (!tokens) next(new ErrorHandler(statusCodes.UNAUTHORIZED, errorMessages.TOKEN_NOT_VALID.en));

            console.log(forgot_token);

            req.currentUser = tokens._user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    validatePassword: (req, res, next) => {
        try {
            const { error, value } = userValidators.createUserValidator.passwordValidator.valid(req.body);

            if (error) next(new ErrorHandler(statusCodes.BAD_REQUEST, errorMessages.USER_NOT_VALID.en));

            res.json(value);

            next();
        } catch (e) {
            next(e);
        }
    },
};
