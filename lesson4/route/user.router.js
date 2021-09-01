const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware } = require('../middleware');

const { userRole } = require('../constans');

router.use('/:userId',
    userMiddleware.isUserByIdExists
);

router.get('/',
    userController.getAllUsers
);

router.post('/',
    userMiddleware.checkNewUserValidation,
    userMiddleware.isUserTrue,
    userMiddleware.isUserHave,
    userController.createUser
);

router.get('/:userId',
    // userMiddleware.checkUSerRole([userRole.ADMIN]),
    userController.getUserById
);

router.put('/:userId',
    userController.updateUserById
);

router.delete('/:userId',
    userController.deleteUser
);

module.exports = router;
