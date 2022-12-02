const prismaClient = require('@prisma/client');
const createHttpError = require('http-errors');
const prisma = new prismaClient.PrismaClient();
const utils = require('@utils/misc');

const save = async (req, res, next) => {
	try {
		const publicImages = utils.findFileName('public/images', req.file.originalname);
		// const carId = Number(req.params.id);
		const car = await prisma.car.findUnique({
			where: { id: Number(req.params.id) },
		});

		if (car == null) throw createHttpError[404]('No car found');

		const result = await prisma.image.create({
			data: {
				alias: publicImages[0],
				carId: Number(req.params.id),
			},
		});

		return res.json(result);
	} catch (error) {
		return next(error);
	}
};

const remove = async (req, res, next) => {
	try {
		const id = Number(req.params.id);

		const image = await prisma.image.findUnique({
			where: { id },
		});

		if (image == null) throw createHttpError[404]('No image found');

		utils.deleteFile('public/images/'+image.alias);

		const response = await prisma.image.delete({
			where: { id },
		});

		return res.json(response);
	} catch (error) {
		return next(error);
	}
};

const update = async (req, res, next) => {
	try {
		const id = Number(req.params.id);

		const car = await prisma.car.findUnique({
			where: { id },
			include: {
				image: true,
			},
		});

		if (car == null) throw createHttpError[404]('No car found');

		const publicImages = utils.findFileName('public/images', req.file.originalname);

		utils.deleteFile('public/images/'+car.image.alias);

		const result = await prisma.image.update({
			where: { carId: car.id },
			data: {
				alias: publicImages[0],
				carId: car.id
			},
		});

		return res.json(result);
	} catch (error) {
		return next(error);
	}
}

const get = async (req, res, next) => {
	try {
		const id = Number(req.params.id);

		const image = await prisma.image.findUnique({
			where: { id }
		});

		if (!image || !image.image) throw createHttpError[404]('No image found');

		//response header, use set
		res.set('Content-Type', 'image/png');

		return res.send(image.image);
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	save,
	remove,
	get,
	update
  };
  