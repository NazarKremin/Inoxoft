const userData = require('../dataBase/models/User');
const {O_Auth} = require('../dataBase/models');

module.exports = {
    authUser: (email) => userData.findOne(email),

    authTokenCreate: (token, user) => O_Auth.create({ ...token, _user_id: user._id }),

    authFindTokenUser: (access_token) => O_Auth.findOne({ access_token }).populate('_user_id'),

    authTokenDelete: (tokens) => O_Auth.findByIdAndRemove(tokens._id),
};