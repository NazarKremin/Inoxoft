const mongoose = require('mongoose');
const { MONGO_URL } = require('../config');
const { passwordHash } = require('../helpers');
const { User } = require('../dataBase/models');

mongoose.connect(MONGO_URL);

const seedAdmin = async () => {
    try {
        let done = 0;

        const admin = [new User({
            name: 'Admin',
            email: 'admin123@project-company-name.com',
            password: await passwordHash.hash('generalAdmin32123'),
            role: 'Admin'
        })];

        for (let i = 0; i < admin.length; i++) {

            admin[i].save((err, res) => {
                done++;

                if (done === admin.length) {
                    mongoose.disconnect();
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
};

seedAdmin();