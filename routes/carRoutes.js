const express = require('express');
const {
  createCar,
  getRides,
  rentCar,
  updateRentHistory
} = require('../controllers/carController');
const { protect, restrictToAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/car/create', restrictToAdmin, createCar);
router.get('/car/get-rides', protect, getRides);
router.get('/car/rent', protect, rentCar);
router.post('/car/update-rent-history', restrictToAdmin, updateRentHistory);

module.exports = router;
