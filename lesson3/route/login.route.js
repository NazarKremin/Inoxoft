const router = require('express').Router();

const { loginController } = require('../controller');

router.get('/',
    loginController.renderLoginPage
);

router.post('/',
    loginController.authUser
);

module.exports = router;
