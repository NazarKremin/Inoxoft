const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware, userMiddleware} = require("../middleware");
const { actionTypesEnum } = require('../constans');

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

router.post(
    '/forgot-password',
    userMiddleware.getUserByDynamicPara('email'),
    authController.forgotPassword,
);

router.post(
    '/forgot-password/set',
    authMiddleware.validatePassword,
    authMiddleware.checkActionToken(actionTypesEnum.FORGOT_PASS),
    authController.setNewPassword,
);

module.exports = router;