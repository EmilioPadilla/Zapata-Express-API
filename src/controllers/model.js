const prismaClient = require('@prisma/client');
const createHttpError = require('http-errors');

const prisma = new prismaClient.PrismaClient();

// Get all.
const getAll = async (_req, res, next) => {
    try {
        const cars = await prisma.model.findMany();

        return res.json(cars);
    } catch (error) {
        return next(error);
    }
};

// Get by ID
const get = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const car = await prisma.model.findUnique({
            where: { id },
        });

        if (car == null) throw createHttpError[404]('No model found 👉🏼👈🏼');

        return res.json(car);
    } catch (error) {
        return next(error);
    }
};

// Create Car -- Faltan Endpoints de modelos
const create = async (req, res, next) => {
    try {
        const { name, year, modelId } = req.body;

        const result = await prisma.model.create({
            data: {
                name,
                year,
                brand: {
                    connect: {
                        id: modelId,
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
        const { name, year} = req.body;
        const id = Number(req.params.id);
  
      const car = await prisma.model.findUnique({
        where: { id },
      });
  
      if (car == null) throw createHttpError[404]('No model found 👉🏼👈🏼');
  
      const response = await prisma.car.update({
        where: { id },
        data: {
            name,
            year,
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
