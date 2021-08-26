const router = require('express').Router();

const { errorController } = require('../controller');

router.get('/',
    errorController.renderError
);

module.exports = router;
