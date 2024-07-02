const dotenv = require('dotenv');

dotenv.config();

const config ={
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    // JWT_SECRET: process.env.JWT_SECRET
}

module.exports=config
