require('module-alias/register');

// Libraries
const createHttpError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

// Import auth middleware
//const isAuth = require('./middlewares/isAuth');

// Import all routers
const router = require('./routes');

// Use Express
const app = express();

// Turn on modules
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors('http://localhost:3000'));

// Use jwt service
//app.use(isAuth());

// Routers
app.use('/api/auth', router.authRoutes);
app.use('/api/users', router.userRoutes);
app.use('/api/clients', router.clientRoutes);
app.use('/api/offices', router.officeRoutes);
app.use('/api/employees', router.employeeRoutes);
app.use('/api/cars', router.carRoutes);
app.use('/api/v1/gps', router.gpsRoutes);
app.use('/api/models', router.modelRoutes);
app.use('/api/brands', router.brandRoutes);

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createHttpError(404));
});

module.exports = app;
