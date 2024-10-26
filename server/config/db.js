const mongoose = require('mongoose');
require('dotenv').config();

const ConnectDB = async () => {
    try {
        mongoose.connect(process.env.DB_STRING)
           .then(() => console.log('Database connected'))
           .catch(err => console.log('Error connecting to Database:', err));
    } catch (err) {
        console.error('Error connecting to Database:', err);
    }
};

module.exports = ConnectDB; 
