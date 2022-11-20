const prismaClient = require('@prisma/client');
const createHttpError = require('http-errors');
const prisma = new prismaClient.PrismaClient();


const save = async (req, res) => {
	try {
		console.log('req.file.buffer', req);
		const result = await prisma.image.create({
			data: {
				image: req.file.buffer,
			},
		});

		return res.json(result);
	} catch (error) {
		return res.status(400).send(error);
	}
};

const remove = async (req, res) => {
	try {
		const id = Number(req.params.id);

		const image = await prisma.image.findUnique({
			where: { id },
		});

		if (image == null) throw createHttpError[404]('No image found');

		const response = await prisma.image.delete({
			where: { id },
		});

		return res.json(response);
	} catch (error) {
		res.status(400).send(error);
	}
};

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
	get
  };
  