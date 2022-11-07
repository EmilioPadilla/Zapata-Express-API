require('module-alias/register');

// Libraries
const createHttpError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// Import all routers
const router = require('./routes');

// Use Express
const app = express();

// Turn on modules
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routers
app.use('/api/users', router.userRoutes);
app.use('/api/clients', router.clientRoutes); 
app.use('/api/cars', router.carRoutes);

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createHttpError(404));
});

// Start server
const server = app.listen(8000, () =>
  console.log(`
  🚀 Server ready at: http://localhost:8000`)
);

module.exports = server;
