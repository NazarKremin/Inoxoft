const { userService } = require('../service');

module.exports = {
    renderUserPage: (req, res) => res.render('users'),

    getUsers: async (req, res) => {
        const users = await userService.getUsers()

        res.render('users', {users})
    }
};
