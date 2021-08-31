const { carService } = require('../service');
const { statusCodes } = require('../constans');
const { passwordHash } = require('../helpers');

module.exports = {
    createCar: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashPassword = await passwordHash.hash(password);

            await carService.createCar({...req.body, password: hashPassword });

            res.status(statusCodes.CRATED).json('Car done');
        } catch (e) {
            next(e);
        }
    },

    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.allCars();

            res.status(statusCodes.OK).json(cars);
        } catch (e) {
            next(e);
        }
    },

    getCarById: async (req, res, next) => {
        try {
            const { carId } = req.params;

            const user = await carService.carById(carId);

            res.status(statusCodes.OK).json(user);
        } catch (e) {
            next(e);
        }
    },
    deleteCar: async (req, res, next) => {
        try {
            const { carId } = req.params;

            await carService.deleteCarById(carId);

            res.status(statusCodes.OK).json('Car removed');
        } catch (e) {
            next(e);
        }
    },
};
