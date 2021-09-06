const jwt = require('jsonwebtoken');

const O_Auth = require('../dataBase/models/O_Auth');
const ErrorHandler = require("../errors/error.messages");
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../config');
const { constans, statusCodes, errorMessages} = require('../constans');

const validateToken =  (token, typeOfToken = 'access_token') => {
    try {
        const jwtSecretKey = typeOfToken === 'access_token' ? JWT_SECRET : JWT_REFRESH_SECRET;

        jwt.verify(token, jwtSecretKey);
    } catch (e) {
        throw new ErrorHandler(statusCodes.UNAUTHORIZED, errorMessages.INVALID_TOKEN.en);
    }
}

// Таке питання, при реєстрації ми зразу видаємо токени, чи ми наприклад кидаємо лист і в ньому
// при переході генеруються вже токени, як з тим самим форгот пассворд?
// але впринципі це залежить від того чи треба активувати аккаунт чи ні?

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get(constans.AUTHORIZATION);

            if (!access_token) next(new ErrorHandler(statusCodes.UNAUTHORIZED, errorMessages.TOKEN_REQUIRED.en));

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err)
                    next(new ErrorHandler(statusCodes.UNAUTHORIZED, errorMessages.TOKEN_NOT_VALID.en));
            });

            const tokens = await O_Auth.findOne({ access_token }).populate('_user_id');

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

            const dataBaseRefreshToken = await O_Auth.findOne({ refresh_token: token }).populate('user');

            if (!dataBaseRefreshToken) next(new ErrorHandler(statusCodes.UNAUTHORIZED, errorMessages.INVALID_TOKEN));

            req.currentUser = dataBaseRefreshToken.user;

            next();
        } catch (e) {
            next(e);
        }
    },
};
