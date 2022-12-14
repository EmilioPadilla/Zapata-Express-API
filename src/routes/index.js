const userRoutes = require('./user');
const clientRoutes = require('./client');
const gpsRoutes = require('./gps');
const carRoutes = require('./car');
const authRoutes = require('./auth');
const officeRoutes = require('./office');
const employeeRoutes = require('./employee');
const modelRoutes = require('./model');
const brandRoutes = require('./brand');
const imagesRoutes = require('./images');

module.exports = {
  authRoutes,
  userRoutes,
  clientRoutes,
  gpsRoutes,
  carRoutes,
  officeRoutes,
  employeeRoutes,
  modelRoutes,
  brandRoutes,
  imagesRoutes
};
