const Car = require('../models/carModel');

const createCar = async (req, res) => {
  const { category, model, number_plate, current_city, rent_per_hr, rent_history } = req.body;
  const carId = await Car.createCar(category, model, number_plate, current_city, rent_per_hr, rent_history);

  res.status(201).json({
    message: 'Car added successfully',
    car_id: carId,
    status_code: 200,
  });
};

const getRides = async (req, res) => {
  const { origin, destination, category, required_hours } = req.body;
  const cars = await Car.getCarsByCriteria(origin, destination, category, required_hours);

  if (cars.length === 0) {
    return res.status(400).json({ status: 'No car is available at the moment', status_code: 400 });
  }

  res.status(200).json(cars);
};

const rentCar = async (req, res) => {
    const { car_id, origin, destination, hours_requirement } = req.body;
  
    
    if (!car_id || !origin || !destination || !hours_requirement) {
      return res.status(400).json({
        status: 'Fail',
        status_code: 400,
        message: 'Missing required parameters'
      });
    }
  
    try {
     
      const car = await Car.getCarById(car_id);
  
      if (!car) {
        return res.status(404).json({
          status: 'Fail',
          status_code: 404,
          message: 'Car not found'
        });
      }
  
      let rentHistory = [];
  
      
      if (car.rent_history) {
        rentHistory = JSON.parse(car.rent_history);
      }
  
      const newRentalRecord = { origin, destination, amount: car.rent_per_hr * hours_requirement };
      rentHistory.push(newRentalRecord);

      await Car.updateCarRentHistory(car_id, JSON.stringify(rentHistory));
  
      res.status(200).json({
        status: 'Success',
        status_code: 200,
        message: 'Car rented successfully',
        rent_id: `${car_id}-${Date.now()}`,
        total_payable_amt: car.rent_per_hr * hours_requirement,
      });
  
    } catch (error) {
      console.error('Failed to rent car:', error);
      res.status(500).json({
        status: 'Error',
        status_code: 500,
        message: 'Failed to rent car. Please try again later.'
      });
    }
  };
  
  

const updateRentHistory = async (req, res) => {
  const { car_id, rent_history } = req.body;
  await Car.updateCarRentHistory(car_id, rent_history);

  res.status(200).json({
    status: 'Rent history updated successfully',
    status_code: 200,
  });
};


module.exports={createCar,getRides,rentCar,updateRentHistory}