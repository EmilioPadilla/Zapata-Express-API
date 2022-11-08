const prismaClient = require('@prisma/client');
const { utils } = require('@utils/misc');

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
    //  a) Save lat, long, orient, vel in GPS table
    // TODO: Uncomment when seeders ready
    // updateCoordinates(_req, res, next);
    //  b) Retrieve lat, long, orient from GPS to calculate
    // 		km traveled from GPS info
    //  c) Update Car.km by adding km calculated in b)
    // TODO: Uncomment when seeders ready
    // calculateKmTraveled(_req, res, next);

    return res.json(_req.body);
  } catch (error) {
		return next(error);
	}
};

const updateCoordinates = async (req, res, next) => {
	try {
		const response = await prisma.gps.update({
			where: { alias: req.Alias },
			data: {
				latitude: req.Latitud,
				longitude: req.Longitud,
				orientation: req.Orientacion,
				velocity: req.Velocidad
			},
		});
		return res.json(response);
	} catch (error) {
		return next(error);
	}
};

const calculateKmTraveled = async (req, res, next) => {
	try {
    const { Latitud, Longitud } = req.body;

    const gps = await prisma.gps.findUnique({
      where: { alias: req.Alias },
    });

    if (gps == null) throw createHttpError[404]('No gps found');

    // TODO: Calculate distance out of
    const km = utils.getDistanceFromLatLonInKm(Latitud, Longitud, gps.latitude, gps.longitude);

	const car = prisma.car.update({
		where: { id: gps.car },
		data: {
		currentKilometers: km
		},
	});

    return res.json(car);
  } catch (error) {
		return next(error);
	}
};

module.exports = {
  getGpsCoordinates,
  updateCoordinates,
  calculateKmTraveled,
};
