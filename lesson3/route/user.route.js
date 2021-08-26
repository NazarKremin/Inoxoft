const router = require('express').Router();

const { userController } = require('../controller');

router.get('/',
    userController.renderUserPage,
    userController.getUsers
);

module.exports = router;
