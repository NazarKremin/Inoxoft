const router = require('express').Router();

const { carController } = require('../controller');
const { carMiddleware, userMiddleware, authMiddleware } = require('../middleware');

router.get('/',
    carMiddleware.isCarTrue,
    carController.getAllCars
);

router.post('/',
    carMiddleware.isCarTrue,
    authMiddleware.checkAccessTokenMiddleware,
    carController.createCar
);

router.get('/:carId',
    carMiddleware.carCheckId,
    authMiddleware.checkAccessTokenMiddleware,
    carController.getCarById
);

router.get('/:carId',
    carMiddleware.carCheckId,
    authMiddleware.checkAccessTokenMiddleware,
    carController.deleteCar
);

module.exports = router;
