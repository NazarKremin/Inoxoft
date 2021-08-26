const path = require('path');
const util = require('util');
const fs = require('fs');

module.exports = {
    dataBase: path.join(__dirname, 'users.json'),
    readFilePromise: util.promisify(fs.readFile),
    writeFilePromise: util.promisify(fs.writeFile),
};
