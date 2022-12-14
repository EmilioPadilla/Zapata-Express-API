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

    if (gps.geofenceActive && gps.geofenceRadiusKm) {
      // Set center point in geofence circle
      const { Latitud, Longitud } = _req.body;
      if (!gps.geofenceLat || !gps.geofenceLong) {
        await prisma.gps.update({
          where: { id: gps.id },
          data: {
            geofenceLat: Number(Latitud),
            geofenceLong: Number(Longitud),
          },
        });
      }

      // If center point defined, just check if gps not exiting geofence
      const distanceBetweenLocations = utils.getDistanceFromLatLonInKm(Number(Latitud), Number(Longitud), gps.geofenceLat, gps.geofenceLong);
      if (distanceBetweenLocations > gps.geofenceRadiusKm) {
        // Push notifications or what?
        console.log('CAR=', gps.alias, ' IS OUTSIDE GEOFENCE by ', distanceBetweenLocations, 'km');
      } else {
        console.log(gps.alias, ' inside ', gps.geofenceRadiusKm, ' geofence by', distanceBetweenLocations, 'km');
      }
    }

    // a) Save lat, long, orient, vel in GPS table
    await updateCoordinates(_req, gps, next);
    // b) Retrieve lat, long, orient from GPS to calculate
    // 	km traveled from GPS info
    // c) Update Car.km by adding km calculated in b)
    await calculateKmTraveled(_req, gps, next);

    console.log({
      "alias": _req.body.Alias,
      "lat": _req.body.Latitud,
      "long": _req.body.Longitud
    });
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

    const km = utils.getDistanceFromLatLonInKm(Number(Latitud), Number(Longitud), gps.latitude, gps.longitude);
    if (km > 0.05) {
      await prisma.car.update({
        where: { id: car.id },
        data: {
          currentKilometers: car.currentKilometers + km,
        },
      });
    } else { console.log('WARN - Distance traveled less than 50m, didnt update km traveled'); }
  
    console.log('200 - Updated KM traveled');
    return '200 - Updated KM traveled';
  } catch (error) {
    return next(error);
  }
};

const activateValetMode = async (req, res, next) => {
  try {
    const { geofenceRadiusKm } = req.body;

	const id = Number(req.params.id);

	const car = await prisma.car.findUnique({
		where: { id },
		include: {
			gps: true,
		},
	});

    const response = await prisma.gps.update({
      where: { carId: car.id },
      data: {
        geofenceActive: true,
        geofenceRadiusKm,
		geofenceLat: car.gps.latitude,
		geofenceLong: car.gps.longitude
      },
    });
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

const deactivateValetMode = async (req, res, next) => {
  try {
	const id = Number(req.params.id);

	const car = await prisma.car.findUnique({
		where: { id },
		include: {
			gps: true,
		},
	});

    const response = await prisma.gps.update({
      where: { carId: car.id },
      data: {
        geofenceActive: false,
        geofenceLat: null,
        geofenceLong: null,
      },
    });
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

const updateGeofence = async (req, res, next) => {
  try {
	const id = Number(req.params.id);
	const { geofenceRadiusKm } = req.body;

	const car = await prisma.car.findUnique({
		where: { id },
		include: {
			gps: true,
		},
	});

	const response = await prisma.gps.update({
		where: { carId: car.id },
		data: {
			geofenceRadiusKm: geofenceRadiusKm,
		},
	});

	return res.json(response);
  } catch (error) {
    return next('Could not update geofence', error);
  }
};

const get = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    console.log(id);

    const gps = await prisma.gps.findUnique({
      where: { id }
    });

    if (gps == null) throw createHttpError[404]('No gps found');

    return res.json(gps);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getGpsCoordinates,
  activateValetMode,
  deactivateValetMode,
  updateGeofence,
  get,
};
