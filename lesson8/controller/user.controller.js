const { userService, mailService } = require('../service');
const { statusCodes, emailAction, errorMessages, userRole, actionTypesEnum} = require('../constans')
const { passwordHash, tokenizer } = require('../helpers');
const ErrorHandler = require('../errors/error.messages');
const { userUtils, fileUtils} = require('../utils');
const {User, ActionToken} = require("../dataBase/models");
const {sendMail} = require("../service/mail.service");
const {ADMIN_PASSWORD_SET} = require("../config");

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { body: { password, email }, files: {avatar} } = req;

            const hasPassword = await passwordHash.hash(password);

            let user = await userService.createUser({ ...req.body, password: hasPassword });

            if (avatar) {
                const { _id } = user;

                const uploadFile = await fileUtils.upload(avatar, 'user', _id.toString());

                user = await User.findByIdAndUpdate(_id, {avatar: uploadFile.Location}, {new: true});
            }

            await mailService.sendMail(email, emailAction.WELCOME, {
                userName: email,
            });

            const normalizedUser = userUtils.userNormalizer(user);

            res.status(statusCodes.CRATED).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            await userService.updateUserById(userId, {...req.body});

            res.status(statusCodes.ACCEPTED).json('User done');
        } catch (e) {
            next(e)
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.allUsers();

            console.log(users)

            res.status(statusCodes.OK).json(users);
        } catch (e) {
            next(e)
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await userService.userById(userId);

            const normalUser = userUtils.userNormalizer(user);

            if (!user) throw new ErrorHandler(statusCodes.METHOD_NOT_ALLOWED, errorMessages.USER_NOT_FOUND.en)

            res.status(statusCodes.OK).json(normalUser);
        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await userService.deleteUserById(userId);

            res.status(statusCodes.OK).json('User removed');
        } catch (e) {
            next(e)
        }
    },

    createAdmin: async (req, res, next) => {
        try {
            const { email, password, role } = req.body;

            if (role !== userRole.ADMIN) next(new ErrorHandler(statusCodes.BAD_REQUEST, 'Your permission is low'));

            const hashPassword = await passwordHash.hash(password);

            const createdUser = await User.create({
                email,
                password: hashPassword,
                role
            });

            const forgot_token = tokenizer.generateActionToken(actionTypesEnum.FORGOT_PASS);

            await ActionToken.create({
                forgot_token,
                user: createdUser._id
            });

            await sendMail(email, emailAction.WELCOME, {
                email,
                newAdminPassword: `${ADMIN_PASSWORD_SET}/user/admin/set_password?actionToken=${forgot_token}`
            });

            res.status(statusCodes.OK).json('Admin created');
        } catch (e) {
            next(e);
        }
    },
};
