const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 5000;
const ConnectDB = require('./config/db.js')

const countryRoutes = require('./routes/CountryRoute');
const stateRoutes = require('./routes/StateRoute'); 
const districtRoutes = require('./routes/DistrictRoute');
const talukasRoutes = require('./routes/TalukaRoute');
const firmRoutes = require('./routes/firmRoute')

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'request.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

ConnectDB();

app.use('/api/countries', countryRoutes);
app.use('/api/states', stateRoutes); 
app.use('/api/districts', districtRoutes);
app.use('/api/talukas', talukasRoutes);
app.use('/api/firms', firmRoutes);

app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}`);
});
