const Car = require('../models/carModel');

exports.createCar = async (req, res) => {
  const { category, model, number_plate, current_city, rent_per_hr, rent_history } = req.body;
  const carId = await Car.createCar(category, model, number_plate, current_city, rent_per_hr, rent_history);

  res.status(201).json({
    message: 'Car added successfully',
    car_id: carId,
    status_code: 200,
  });
};

exports.getRides = async (req, res) => {
  const { origin, destination, category, required_hours } = req.query;
  const cars = await Car.getCarsByCriteria(origin, destination, category, required_hours);

  if (cars.length === 0) {
    return res.status(400).json({ status: 'No car is available at the moment', status_code: 400 });
  }

  res.status(200).json(cars);
};

exports.rentCar = async (req, res) => {
  const { car_id, origin, destination, hours_requirement } = req.body;
  const car = await Car.getCarById(car_id);

  if (!car) {
    return res.status(400).json({ status: 'No car is available at the moment', status_code: 400 });
  }

  const rentHistory = JSON.parse(car.rent_history);
  rentHistory.push({ origin, destination, amount: car.rent_per_hr * hours_requirement });

  await Car.updateCarRentHistory(car_id, rentHistory);

  res.status(200).json({
    status: 'Car rented successfully',
    status_code: 200,
    rent_id: `${car_id}-${Date.now()}`,
    total_payable_amt: car.rent_per_hr * hours_requirement,
  });
};

exports.updateRentHistory = async (req, res) => {
  const { car_id, rent_history } = req.body;
  await Car.updateCarRentHistory(car_id, rent_history);

  res.status(200).json({
    status: 'Rent history updated successfully',
    status_code: 200,
  });
};

