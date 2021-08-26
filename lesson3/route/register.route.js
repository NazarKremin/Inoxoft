const router = require('express').Router();

const { registerController } = require('../controller');

router.get('/',
    registerController.renderRegisterPage
);

router.post('/',
    registerController.registerUser
);

module.exports = router;
