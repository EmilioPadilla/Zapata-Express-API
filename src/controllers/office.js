const prismaClient = require('@prisma/client');
const createHttpError = require('http-errors');

const prisma = new prismaClient.PrismaClient();

const create = async (req, res, next) => {
  try {
    const { name, address, state, city } = req.body;

    const office = await prisma.office.findUnique({
      where: { name },
    });

    if (office != null) throw createHttpError[409]('We already have an office with that name');

    const result = await prisma.office.create({
      data: {
        name,
        address,
        state,
        city,
      },
    });

    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const offices = await prisma.office.findMany();

    return res.json(offices);
  } catch (error) {
    return next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const office = await prisma.office.findUnique({
      where: { id },
    });

    if (office == null) throw createHttpError[404]('No office found');

    return res.json(office);
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, address, state, city } = req.body;
    const id = Number(req.params.id);

    const office = await prisma.office.findUnique({
      where: { id },
    });

    if (office == null) throw createHttpError[404]('No office found');

    const response = await prisma.office.update({
      where: { id },
      data: {
        name,
        address,
        state,
        city,
      },
    });

    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  update,
  getAll,
  get,
};
