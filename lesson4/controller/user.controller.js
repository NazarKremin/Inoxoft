const { userService } = require('../service');
const { statusCodes } = require('../constans')
const ErrorHandler = require('../errors/error.messages');
const { userUtils } = require('../utils');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            await userService.createUser(req.body);

            res.status(statusCodes.CRATED).json('User done');
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

            if (!user) throw new ErrorHandler(statusCodes.METHOD_NOT_ALLOWED, 'User Not Found')

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
};
