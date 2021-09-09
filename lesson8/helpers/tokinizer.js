const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_REFRESH_SECRET, JWT_FORGOT_PASS_TOKEN } = require('../config');
const ErrorHandler = require("../errors/error.messages");
const {statusCodes, errorMessages, actionTypesEnum} = require("../constans");

module.exports = () => {
    const access_token = jwt.sign({}, JWT_SECRET, {expiresIn: '10m'});
    const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

    return {
        access_token,
        refresh_token,
    }
};

module.exports = {
    generateActionToken: (tokenType) => {
        let word = '';
        switch (tokenType) {
            case actionTypesEnum.FORGOT_PASS :
                word = JWT_FORGOT_PASS_TOKEN;

                break;
            case actionTypesEnum.FIRST_LOGIN :
                word = JWT_FORGOT_PASS_TOKEN;

                break;
            default:
                throw new ErrorHandler(statusCodes.SERVER_ERROR, errorMessages.WRONG_TOKEN_TYPE.en);
        }
        return jwt.sign({tokenType}, word, {expiresIn: '7d'});
    },

    verifyActionToken: (tokenType, token) => {
        let word = '';
        switch (tokenType) {
            case actionTypesEnum.FORGOT_PASS :
                word = JWT_FORGOT_PASS_TOKEN;

                break;
            case actionTypesEnum.FIRST_LOGIN :
                word = JWT_FORGOT_PASS_TOKEN;

                break;
            default:
                throw new ErrorHandler(statusCodes.SERVER_ERROR, errorMessages.WRONG_TOKEN_TYPE.en);
        }
        return jwt.verify(token, word);
    }
}