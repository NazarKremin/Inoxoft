const { dataBase, writeFilePromise, readFilePromise } = require('../dataBase');

module.exports = {
    getUsers: async () => {
        const users = await readFilePromise(dataBase);

        return JSON.parse(users);
    },
};
