const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', carRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
