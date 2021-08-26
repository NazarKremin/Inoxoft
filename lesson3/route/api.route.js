const router = require('express').Router();

const errorRoute = require('./error.route');
router.use('/error', errorRoute);

const registerRoute = require('./register.route');
router.use('/register', registerRoute);

const loginRoute = require('./login.route');
router.use('/login', loginRoute);

const userRoute = require('./user.route');
router.use('/user', userRoute);

module.exports = router;
