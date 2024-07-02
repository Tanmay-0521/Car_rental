const userSchema =`
CREATE TABLE if not exists users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user'
);
`;

const carsSchema =`
CREATE TABLE cars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  number_plate VARCHAR(20) NOT NULL,
  current_city VARCHAR(50) NOT NULL,
  rent_per_hr INT NOT NULL,
  rent_history JSON DEFAULT '[]'
);`;