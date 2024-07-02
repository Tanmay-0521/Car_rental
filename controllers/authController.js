const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 8);
  const userId = await User.createUser(username, email, hashedPassword, 'user');

  res.status(201).json({
    status: 'Account successfully created',
    status_code: 200,
    user_id: userId,
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.getUserByUsername(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      status: 'Incorrect username/password provided. Please retry',
      status_code: 401,
    });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({
    status: 'Login successful',
    status_code: 200,
    user_id: user.id,
    access_token: token,
  });
};

module.exports ={signup,login}
