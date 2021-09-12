const router = require('express').Router();

const { userController } = require('../controller');
const { authMiddleware, userMiddleware, fileMiddleware} = require('../middleware');

const { userRole } = require('../constans');

router.use('/:userId',
    userMiddleware.isUserByIdExists
);

router.post('/new-admin',
    userMiddleware.checkUSerRole([userRole.ADMIN]),
    userController.createAdmin
);

router.get('/',
    userController.getAllUsers
);

router.post('/',
    // userMiddleware.checkNewUserValidation,
    // fileMiddleware.checkUserAvatar,
    userMiddleware.getUserByDynamicPara('email'),
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
