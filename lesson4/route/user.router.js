const router = require('express').Router();

const { userController } = require('../controller');
const { authMiddleware, userMiddleware } = require('../middleware');

const { userRole } = require('../constans');

router.use('/:userId',
    userMiddleware.isUserByIdExists
);

router.get('/',
    userController.getAllUsers
);

router.post('/',
    // userMiddleware.checkNewUserValidation,
    // userMiddleware.isUserTrue,
    // userMiddleware.isUserHave,
    userController.createUser
);

router.get('/:userId',
    // userMiddleware.checkUSerRole([userRole.ADMIN]),
    userController.getUserById
);

router.put('/:userId',
    authMiddleware.checkAccessTokenMiddleware,
    userController.updateUserById
);

router.delete('/:userId',
    authMiddleware.checkAccessTokenMiddleware,
    userController.deleteUser
);

module.exports = router;
