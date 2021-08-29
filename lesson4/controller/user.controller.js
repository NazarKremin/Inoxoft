const { userService } = require('../service');
const ErrorHandler = require("../errors/error.messages");

module.exports = {
    createUser: async (req, res, next) => {
        try {
            await userService.createUser(req.body);

            res.status(201).json('User done');
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            await userService.updateUserById(userId, {...req.body});

            res.status(201).json('User done');
        } catch (e) {
            next(e)
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.allUsers();

            res.json(users);
        } catch (e) {
            next(e)
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await userService.userById(userId);

            if (!user) throw new ErrorHandler(404, 'User Not Found')

            res.json(user);
        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await userService.deleteUserById(userId);

            res.json('User removed');
        } catch (e) {
            next(e)
        }
    },
};
