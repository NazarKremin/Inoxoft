const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware, userMiddleware} = require("../middleware");

router.post(
    '/',
    userMiddleware.getUserByDynamicPara('email'),
    authController.authUser
);

router.post(
    '/logout',
    authMiddleware.checkAccessTokenMiddleware,
    authController.logOut
);
router.post(
    '/logout-everywhere',
    authMiddleware.checkAccessTokenMiddleware,
    authController.logoutFromAllDevice
);

router.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refreshToken
);

module.exports = router;