const db = require('../config/db');

class Car {
  static async createCar(category, model, number_plate, current_city, rent_per_hr, rent_history) {
    const [result] = await db.execute(
      'INSERT INTO cars (category, model, number_plate, current_city, rent_per_hr, rent_history) VALUES (?, ?, ?, ?, ?, ?)',
      [category, model, number_plate, current_city, rent_per_hr, JSON.stringify(rent_history)]
    );
    return result.insertId;
  }

  static async getCarsByCriteria(origin, destination, category, required_hours) {
    const [rows] = await db.execute(
      'SELECT * FROM cars WHERE current_city = ? AND category = ?',
      [origin, category]
    );
    return rows;
  }

  static async getCarById(id) {
    const [rows] = await db.execute('SELECT * FROM cars WHERE id = ?', [id]);
    return rows[0];
  }

  static async updateCarRentHistory(car_id, rent_history) {
    await db.execute('UPDATE cars SET rent_history = ? WHERE id = ?', [JSON.stringify(rent_history), car_id]);
  }
}

module.exports = Car;
