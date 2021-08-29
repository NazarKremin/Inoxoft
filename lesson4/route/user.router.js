const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware } = require('../middleware');

router.get('/',
    userController.getAllUsers
);

router.get('/:userId',
    userMiddleware.userCheckId,
    userMiddleware.isUserHave,
    userController.getUserById
);

router.post('/',
    userMiddleware.isUserHave,
    userController.createUser
);

router.put('/:userId',
    userMiddleware.userCheckId,
    userMiddleware.isUserHave,
    userController.updateUserById
);

router.delete('/:userId',
    userMiddleware.userCheckId,
    userController.deleteUser
);

module.exports = router;
