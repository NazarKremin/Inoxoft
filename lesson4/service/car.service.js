const { Car } = require('../dataBase/models');

module.exports = {
    allCars: () => Car.find(),

    createCar: (carObj) => Car.create(carObj),

    carById: (carId) => Car.findById(carId),

    deleteCarById: (carId) => Car.findByIdAndDelete(carId),
};
