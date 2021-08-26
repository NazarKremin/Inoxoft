const { dataBase, writeFilePromise, readFilePromise} = require('../dataBase')

module.exports = {
  getUser: async (email) => {
      const user = await readFilePromise(dataBase)

      JSON.parse(user)

      const getUser = await user.find((val) => val.email === email);

      return getUser;
  }
};
