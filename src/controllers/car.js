const prismaClient = require('@prisma/client');
const createHttpError = require('http-errors');


const prisma = new prismaClient.PrismaClient();


/*
const create = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user != null) throw createHttpError[409]('Email already taken');

    const result = await prisma.user.create({
      data: {
        name,
        email,
        password: await hash.hashItem(password),
      },
    });

    return res.json(result);
  } catch (error) {
    return next(error);
  }
};*/

const getAll = async (_req, res, next) => {
  try {
    const cars = await prisma.car.findMany(); /*{
        select: {
            initialKilometers,
            currentKilometers,
            image,
            description

        }
    });*/

    return res.json(cars);
  } catch (error) {
    return next(error);
  }
};
/*
const get = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (user == null) throw createHttpError[404]('No user found');

    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const id = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (user == null) throw createHttpError[404]('No user found');

    const response = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        phone,
      },
    });

    return res.json(response);
  } catch (error) {
    return next(error);
  }
};*/



module.exports = {
  //create,
  //update,
  getAll,
  //get,
};
