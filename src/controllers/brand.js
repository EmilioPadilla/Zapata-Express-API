//US Web 15-19
const prismaClient = require('@prisma/client');
const createHttpError = require('http-errors');

const prisma = new prismaClient.PrismaClient();

const getAll = async (_req, res, next) => {
  try {
    const brands = await prisma.brand.findMany();

    return res.json(brands);
  } catch (error) {
    return next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const brand = await prisma.brand.findUnique({
      where: { id },
    });

    if (brand == null) throw createHttpError[404]('No brand found');

    return res.json(brand);
  } catch (error) {
    return next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const brand = await prisma.brand.findUnique({
      where: { id },
    });

    if (brand == null) throw createHttpError[404]('No brand found');

    const response = await prisma.brand.delete({
      where: { id },
    });

    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const result = await prisma.brand.create({
      data: {
        name,
      },
    });

    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { name } = req.body;
    const id = Number(req.params.id);

    const brand = await prisma.brand.findUnique({
      where: { id },
    });

    if (brand == null) throw createHttpError[404]('No model found');

    const response = await prisma.brand.update({
      where: { id },
      data: {
        name,
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
  remove,
  create,
  update,
};
