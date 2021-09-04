const {User, O_Auth} = require('../dataBase/models');
const { passwordHash, tokenizer } = require('../helpers');
const ErrorHandler = require('../errors/error.messages');
const {statusCodes, errorMessages} = require("../constans");
const {userUtils} = require("../utils");

module.exports = {
    authUser: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            console.log(user)

            if (!user) next(new ErrorHandler(statusCodes.BAD_REQUEST, errorMessages.HERE_NOTHING.en));

            await passwordHash.compare(password, user.password);

            const tokens = tokenizer();

            await O_Auth.create({ ...tokens, _user_id: user._id });

            res.json({
                ...tokens,
                user: userUtils.userNormalizer(user)
            });

            next();
        } catch (e) {
            next(e);
        }
    },

    logOut: async (req, res, next) => {
        try {
            const token = req.get('Authorization');

            if (!token) next(new ErrorHandler(statusCodes.UNAUTHORIZED, errorMessages.TOKEN_NOT_VALID.en));

            await O_Auth.deleteOne({ access_token: token });

            res.status(statusCodes.OK);

            next();
        } catch (e) {
            next(e);
        }
    },

    logoutFromAllDevice: async (req, res, next) => {
        try {
            const { currentUser } = req;

            await O_Auth.deleteMany({ user: currentUser });

            res.status(statusCodes.OK);

            next();
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const token = req.get('Authorization');

            const tokens = tokenizer();

            const dataBaseRefreshToken =
                await O_Auth.findOneAndUpdate({ refresh_token: token }, { ...tokens });

            if (!dataBaseRefreshToken)
                next(new ErrorHandler(statusCodes.UNAUTHORIZED, errorMessages.INVALID_TOKEN.en));

            res.status(statusCodes.OK).json({...tokens});
        } catch (e) {
            next(e);
        }
    },

};