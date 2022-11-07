const prismaClient = require('@prisma/client');
const createHttpError = require('http-errors');

const prisma = new prismaClient.PrismaClient();

const recoverGpsCoordinates = async (_req, res, next) => {
	try {
		const result = await prisma.gps.create({
			data: {
				Alias,
				Latitud,
				Longitud,
				Bateria,
				FechaDispositivo,
				Altitud,
				Velocidad,
				Orientacion,
				ErrorMtsGps,
				NivelGsm
			},
		});

		if (result == null) throw createHttpError[404]('No gps coordinates retrieved');

		console.log('Log', res.json(result));
		return res.json(result);
	} catch (error) {
		console.log('Log', error);
		return next(error);
	}
}

module.exports = {
  recoverGpsCoordinates
};
