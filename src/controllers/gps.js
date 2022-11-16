const prismaClient = require('@prisma/client');
const utils = require('@utils/misc');

const createHttpError = require('http-errors');

const prisma = new prismaClient.PrismaClient();

// Update car information based on GPS
// 1. Recover GPS information
//  a) Save lat, long, orient, vel in GPS table
//  b) Retrieve lat, long, orient from GPS to calculate
// 		km traveled from GPS info
//  c) Update Car.km by adding km calculated in b)
// 2. Velocity limit will be calculated in FRONT from GPS
// 3. Geofence radius will be calculated in FRONT from GPS

const getGpsCoordinates = async (_req, res, next) => {
  try {
    let gps;
    try {
      gps = await prisma.gps.findUnique({
        where: { alias: _req.body.Alias },
      });
    } catch (error) {
      throw createHttpError[404]('getCoord - No GPS with given alias found', error);  
    }

    if (gps.geofenceActive) {
      // Logic for calculating if outside geofence
    }

    // a) Save lat, long, orient, vel in GPS table
    await updateCoordinates(_req, gps, next);
    // b) Retrieve lat, long, orient from GPS to calculate
    // 	km traveled from GPS info
    // c) Update Car.km by adding km calculated in b)
    await calculateKmTraveled(_req, gps, next);

    console.log(_req.body.Alias);
    return res.json(_req.body);
  } catch (error) {
    return next(error);
  }
};

const updateCoordinates = async (req, gps, next) => {
  try {
    const { Latitud, Longitud, Orientacion, Velocidad } = req.body;

    await prisma.gps.update({
      where: { id: gps.id },
      data: {
        latitude: Number(Latitud),
        longitude: Number(Longitud),
        orientation: Number(Orientacion),
        velocity: Number(Velocidad),
      },
    });
    console.log('200 - Updated coordinates')
    return '200 - Updated Coordinates';
  } catch (error) {
    return next(error);
  }
};

const calculateKmTraveled = async (req, _gps, next) => {
  try {
    const { Latitud, Longitud } = req.body;
    let gps, car;
    try {
      gps = await prisma.gps.findUnique({
        where: { id: _gps.id },
      });
    } catch (error) {
      throw createHttpError[404]('CalcKms - No GPS with given alias found', error);
    }

    try {
      car = await prisma.car.findUnique({
        where: { id: _gps.carId },
      });
    } catch (error) {
      throw createHttpError[404]('CalcKms - No Car related to GPS', error);
    }

    const km = utils.getDistanceFromLatLonInKm(Latitud, Longitud, gps.latitude, gps.longitude);
    if (km > 0.05) {
      await prisma.car.update({
        where: { id: car.id },
        data: {
          currentKilometers: car.currentKilometers + km,
        },
      });
    } else { console.log('WARN - Distance traveled was less than 50m, didnt update'); }
  
    console.log('200 - Updated KM traveled');
    return '200 - Updated KM traveled';
  } catch (error) {
    return next(error);
  }
};

const activateValetMode = async (req, res, next) => {
  try {
    const { Alias } = req.body;

    const response = await prisma.gps.update({
      where: { alias: Alias },
      data: {
        geofenceActive: true
      },
    });
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

const deactivateValetMode = async (req, res, next) => {
  try {
    const { Alias } = req.body;

    const response = await prisma.gps.update({
      where: { alias: Alias },
      data: {
        geofenceActive: false,
      },
    });
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

const updateGeofence = async (req, res, next) => {
  try {
    const { Alias, geofenceRadius } = req.body;
    if (!Alias || !geofenceRadius) {
      throw createHttpError[404]('No Alias or geofenceRadius provided');  
    }
    const gps = await prisma.gps.update({
      where: { alias: Alias },
      data: {
        geofenceRadius: geofenceRadius,
      },
    });

    return res.json(gps);
  } catch (error) {
    return next('Could not update geofence', error);
  }
};

module.exports = {
  getGpsCoordinates,
  activateValetMode,
  deactivateValetMode,
  updateGeofence,
};
