const { dataBase, readFilePromise, writeFilePromise } = require('../dataBase');

module.exports = {
    registerUser: async (userObj) => {
        const users = await readFilePromise(dataBase);

        JSON.parse(users);

        users.push(userObj);

        await writeFilePromise(dataBase, JSON.stringify(users));
    }
};
