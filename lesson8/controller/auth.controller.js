const {User, O_Auth, ActionToken} = require('../dataBase/models');
const { authService, mailService} = require('../service');
const { FORGET_PASS_FRONT_URL} = require('../config');
const { passwordHash, tokenizer } = require('../helpers');
const ErrorHandler = require('../errors/error.messages');
const {statusCodes, errorMessages, constans, actionTypesEnum, emailAction} = require("../constans");
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
            const token = req.get(constans.AUTHORIZATION);

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
            const token = req.get(constans.AUTHORIZATION);

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

    forgotPassword: async (req, res, next) => {
        try {
            const { user } = req;

            const forgot_token = tokenizer.generateActionToken(actionTypesEnum.FORGOT_PASS);

            await ActionToken.create({token: forgot_token, user: user._id});
            // await O_Auth.deleteMany({user: currentUser._id});

            await mailService.sendMail(user.email, emailAction.FORGOT_PASSWORD, {
                forgotPasswordURL:`${FORGET_PASS_FRONT_URL}/forgot?token=${forgot_token}`
            });

            res.json('Email was sent');

            next();
        } catch (e) {
            next(e);
        }
    },

    setNewPassword: async (req, res, next) => {
        try{
            const {currentUser, body} = req;

            const forgot_token = req.get(constans.AUTHORIZATION);

            const hashPass = await passwordHash.hash(body.password);

            await User.findByIdAndUpdate(currentUser._id, {password: hashPass});

            await ActionToken.deleteOne({ forgot_token });

            await O_Auth.deleteMany({user: currentUser._id});

            res.json('Passweord Set');

            next();
        } catch (e) {
            next(e);
        }
    }

    // getAuthUser: async (req, res, next) => {
    //     try {
    //         const { email, password } = req.body;
    //
    //         const user = await authService.authUser({ email });
    //
    //         await passwordHash.compare(password, user.password);
    //
    //         const tokens = tokenizer();
    //
    //         await authService.authTokenCreate(tokens, user);
    //
    //         res.json(tokens);
    //
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // },
    // CreateNewToken: async (req, res, next) => {
    //     const { tokens } = req;
    //     try {
    //         await authService.authTokenDelete(tokens);
    //
    //         const newTokens = tokenizer();
    //
    //         await authService.authTokenCreate(newTokens, tokens);
    //
    //         res.json(newTokens);
    //
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // },
};