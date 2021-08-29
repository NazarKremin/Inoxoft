const router = require('express').Router();

const { carController } = require('../controller');
const { carMiddleware } = require('../middleware');

router.get('/',
    carMiddleware.isCarTrue,
    carController.getAllCars
);

router.post('/',
    carMiddleware.isCarTrue,
    carController.createCar
);

router.get('/:carId',
    carMiddleware.carCheckId,
    carController.getCarById
);

router.get('/:carId',
    carMiddleware.carCheckId,
    carController.deleteCar
);

module.exports = router;
