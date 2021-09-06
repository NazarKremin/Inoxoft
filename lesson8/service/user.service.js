const { User } = require('../dataBase/models');
require('../dataBase/models/Car');

module.exports = {
    createUser: (userObj) => User.create(userObj),

    allUsers: () => User.find(),

    userById: (userId) => User.findById(userId),

    updateUserById: (userId, updateObject) => User.updateOne({ _id: userId }, { $set: updateObject }),

    deleteUserById: (userId) => User.findByIdAndDelete(userId),

};
