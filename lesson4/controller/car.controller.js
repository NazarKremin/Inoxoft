const { carService } = require('../service');

module.exports = {
    createCar: async (req, res, next) => {
        try {
            await carService.createCar(req.body);

            res.status(201).json('Car done');
        } catch (e) {
            next(e);
        }
    },

    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.allCars();

            res.status(200).json(cars);
        } catch (e) {
            next(e);
        }
    },

    getCarById: async (req, res, next) => {
        try {
            const { carId } = req.params;

            const user = await carService.carById(carId);

            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    },
    deleteCar: async (req, res, next) => {
        try {
            const { carId } = req.params;

            await carService.deleteCarById(carId);

            res.status(200).json('Car removed');
        } catch (e) {
            next(e);
        }
    },
};
