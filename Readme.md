
# Car Rental System

## Setup

1. Clone the repository
   ```bash
   git clone https://github.com/your-repo/car-rental-system.git
   cd car-rental-system


Install dependencies

bash  
npm install
Configure environment variables in a .env file

"PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=car_rental
JWT_SECRET=your_jwt_secret
ADMIN_API_KEY=your_admin_api_key"

Run the application

npm start

Signup
//Description of endpoints
Endpoint: POST /api/signup
Request Body: { "username": "example_user", "password": "example_password", "email": "user@example.com" }
Response: { "status": "Account successfully created", "status_code": 200, "user_id": "123445" }
Login

Endpoint: POST /api/login
Request Body: { "username": "example_user", "password": "example_password" }
Response: { "status": "Login successful", "status_code": 200, "user_id": "12345", "access_token": "your_jwt_token" }
Car
Add Car (Admin Only)

Endpoint: POST /api/car/create
Headers: { "x-api-key": "your_admin_api_key" }
Request Body: { "category": "SUV", "model": "BMW Q3", "number_plate": "KA1234", "current_city": "bangalore", "rent_per_hr": 100, "rent_history": [] }
Response: { "message": "Car added successfully", "car_id": "12345", "status_code": 200 }
Get Rides

Endpoint: GET /api/car/get-rides?origin=bangalore&destination=mumbai&category=SUV&required_hours=10
Headers: { "Authorization": "Bearer your_jwt_token" }
Response: [ { "car_id": "1234", "category": "SUV", "model": "BMW Q3", "number_plate": "KA1234", "current_city": "bangalore", "rent_per_hr": 100, "rent_history": [], "total_payable_amt": 1000 }, ... ]
Rent Car

Endpoint: POST /api/car/rent
Headers: { "Authorization": "Bearer your_jwt_token" }
Request Body: { "car_id": "12345", "origin": "mumbai", "destination": "bangalore", "hours_requirement": 10 }
Response: { "status": "Car rented successfully", "status_code": 200, "rent_id": "54321", "total_payable_amt": 1000 }
Update Rent History (Admin Only)

Endpoint: POST /api/car/update-rent-history
Headers: { "x-api-key": "your_admin_api_key" }
Request Body: { "car_id": "12345", "rent_history": [{ "origin": "mumbai", "destination": "bangalore", "amount": 1000 }] }
Response: { "status": "Rent history updated successfully", "status_code": 200 }

