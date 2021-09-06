module.exports = {
    userNormalizer: (userObj) => {
        // userObj = userObj.toJSON();

        userObj = userObj.toObject();

        const fieldsToDelete = [
            '__v',
            'password',
        ];

        fieldsToDelete.map((field) => {
            delete userObj[field];
        });

        return userObj;
    }
};