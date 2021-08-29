const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware } = require('../middleware');

router.get('/',
    userController.getAllUsers
);

router.get('/:userId',
    userMiddleware.isUserByIdExists,
    userController.getUserById
);

router.post('/',
    userMiddleware.isUserTrue,
    userMiddleware.isUserHave,
    userController.createUser
);

router.put('/:userId',
    userMiddleware.isUserByIdExists,
    userController.updateUserById
);

router.delete('/:userId',
    userMiddleware.isUserByIdExists,
    userController.deleteUser
);

module.exports = router;
