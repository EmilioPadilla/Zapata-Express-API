const prismaClient = require('@prisma/client');
const createHttpError = require('http-errors');
const hash = require('@utils/hash.js');

const prisma = new prismaClient.PrismaClient();

const create = async (req, res, next) => {
  try {
    const { name, email, password, phone, birthDate, address, employeeId } = req.body;

    const client = await prisma.user.findUnique({
      where: { email },
    });

    if (client != null) throw createHttpError[409]('Email already taken');

    const result = await prisma.client.create({
      data: {
        user: {
          create: {
            name,
            email,
            password: await hash.hashItem(password),
            phone,
            role: {
              connectOrCreate: {
                where: {
                  name: 'cliente',
                },
                create: {
                  name: 'cliente',
                },
              },
            },
          },
        },
        employee: {
          connect: {
            id: employeeId,
          },
        },
        birthDate: new Date(birthDate),
        address,
      },
    });

    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

const createCar = async (req, res, next) => {
  try {
    const { startingKilometers, image, description, modelId } = req.body;
    const id = Number(req.params.id);

    const model = await prisma.model.findUnique({
      where: { id: modelId },
    });

    if (model == null) throw createHttpError[404]('No model found');

    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (client == null) throw createHttpError[404]('No client found');

    const result = await prisma.car.create({
      data: {
        startingKilometers,
        currentKilometers: startingKilometers,
        image,
        description,
        model: {
          connect: {
            id: modelId,
          },
        },
        client: {
          connect: {
            id,
          },
        },
      },
    });

    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const clients = await prisma.client.findMany({
      include: { user: true, cars: true },
    });

    return res.json(clients);
  } catch (error) {
    return next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const client = await prisma.client.findUnique({
      where: { id },
      include: { user: true },
    });

    if (client == null) throw createHttpError[404]('No client found');

    return res.json(client);
  } catch (error) {
    return next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (client == null) throw createHttpError[404]('No client found');

    const response = await prisma.client.delete({
      where: { id },
    });

    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

const getClient = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    console.log('AQUI' + id);

    const client = await prisma.client.findUnique({
      where: { id },
      select: {
        id: true,
        address: true,
        birthDate: true,
        licenceValidity: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (client == null) throw createHttpError[404]('No client found');

    return res.json(client);
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, email, phone, birthDate, address } = req.body;
    const id = Number(req.params.id);

    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (client == null) throw createHttpError[404]('No client found');

    const response = await prisma.client.update({
      where: { id },
      data: {
        user: {
          update: {
            name,
            email,
            phone,
          },
        },
        birthDate: new Date(birthDate),
        address,
      },
    });

    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { previousPassword, newPassword } = req.body;
    const id = Number(req.params.id);

    const client = await prisma.client.findUnique({
      where: { id },
      include: { user: true },
    });

    if (client == null) throw createHttpError[404]('No client found');

    const validPassword = await hash.validateItem(previousPassword, client.user.password);

    if (!validPassword) throw createHttpError[401]('No matching password');

    const response = await prisma.client.update({
      where: { id },
      data: {
        user: {
          update: {
            password: await hash.hashItem(newPassword),
          },
        },
      },
    });

    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  createCar,
  update,
  updatePassword,
  getAll,
  get,
  remove,
  getClient,
};
