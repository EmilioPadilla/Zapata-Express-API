const prismaClient = require('@prisma/client');
const createHttpError = require('http-errors');

const prisma = new prismaClient.PrismaClient();

const getAll = async (_req, res, next) => {
    try {
        const cars = await prisma.car.findMany();

        return res.json(cars);
    } catch (error) {
        return next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const car = await prisma.car.findUnique({
            where: { id },
        });

        if (car == null) throw createHttpError[404]('No car found');

        return res.json(car);
    } catch (error) {
        return next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const { currentKilometers, image, description, circulationCardValidity, modelId, clientId } = req.body;

        const model = await prisma.model.findUnique({
            where: { id:  modelId },
        });

        if (model == null) throw createHttpError[404]('No model found');

        const client = await prisma.client.findUnique({
            where: { id: clientId },
        });

        if (client == null) throw createHttpError[404]('No client found');


        const result = await prisma.car.create({
            data: {
                currentKilometers,
                image,
                description,
                circulationCardValidity: new Date(circulationCardValidity),
                model: {
                    connect: {
                        id: modelId,
                    },
                },
                client: {
                    connect: {
                        id: clientId,
                    },
                },
            },
        });

        return res.json(result);
    } catch (error) {
        return next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { currentKilometers, image, description, circulationCardValidity } = req.body;
        const id = Number(req.params.id);
  
      const car = await prisma.car.findUnique({
        where: { id },
      });
  
      if (car == null) throw createHttpError[404]('No car found');
  
      const response = await prisma.car.update({
        where: { id },
        data: {
            currentKilometers,
            image,
            description,
            circulationCardValidity: new Date(circulationCardValidity),
        },
      });
  
      return res.json(response);
    } catch (error) {
      return next(error);
    }
  };

module.exports = {
    getAll,
    get,
    create,
    update,
};
