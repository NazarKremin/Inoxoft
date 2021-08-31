module.exports = {
    userNormalizer: (userObj) => {
        userObj = userObj.toJSON();

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