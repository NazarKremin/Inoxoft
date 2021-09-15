const { User } = require('../dataBase/models');
require('../dataBase/models/Car');

module.exports = {
    createUser: (userObj) => User.create(userObj),

    allUsers: () => User.find(),

    userById: (userId) => User.findById(userId),

    updateUserById: (userId, updateObject) => User.updateOne({ _id: userId }, { $set: updateObject }),

    deleteUserById: (userId) => User.findByIdAndDelete(userId),

    // findUsersQuery: async (query = {}) => {
    //     const { limit = 20, page = 1, sortBy = 'createdAt', order = 'asc', ...filters } = query;
    //
    //     const skip = (page - 1) * limit;
    //
    //     const keys = Object.keys(filters);
    //
    //     const filterObject = {};
    //
    //     const orderBy = order === 'asc' ? -1 : 1;
    //
    //     const sort = { [sortBy]: orderBy };
    //
    //     keys.forEach((key) => {
    //         switch (key) {
    //             case 'priceGte':
    //                 filterObject.price = Object.assign({}, filterObject.price, { $gte: +filters.priceGte });
    //                 break;
    //             case 'price_lte':
    //                 filterObject.price = Object.assign({}, filterObject.price, { $lte: +filters.price_lte });
    //                 break;
    //             case 'category':
    //                 const categories = filters.category.split(';');
    //                 filterObject.category = { $in: categories };
    //                 break;
    //             default:
    //                 filterObject[key] = filters[key];
    //         }
    //     });
    //
    //     const users = await User.find(filterObject).limit(+limit).skip(skip).sort(sort);
    //     const count = await User.countDocuments(filterObject);
    //
    //     return {
    //         data: users,
    //         page,
    //         limit,
    //         count,
    //         pages: Math.ceil(count / limit)
    //     };
    // }
};
