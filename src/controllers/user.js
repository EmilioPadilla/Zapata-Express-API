const prismaClient = require('@prisma/client');
const createHttpError = require('http-errors');
const hash = require('@utils/hash.js');

const prisma = new prismaClient.PrismaClient();

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user == null) throw createHttpError[403]('Invalid credentials');

    const validPassword = await hash.validateItem(password, user.password);

    if (!validPassword) throw createHttpError[403]('Invalid credentials');

    // Create the access token with express jwt
    const accessToken = 'the token';

    const response = await prisma.user.update({
      where: { email },
      data: {
        token: accessToken,
      },
    });

    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

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
        password,
      },
    });

    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const users = await prisma.user.findMany();

    return res.json(users);
  } catch (error) {
    return next(error);
  }
};

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
};

const updatePassword = async (req, res, next) => {
  try {
    const { previousPassword, newPassword } = req.body;
    const id = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (user == null) throw createHttpError[404]('No user found');

    const validPassword = await hash.validateItem(previousPassword, user.password);

    if (!validPassword) throw createHttpError[401]('No matching password');

    const response = await prisma.user.update({
      where: { id },
      data: {
        password: await hash.hashItem(newPassword),
      },
    });

    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
  create,
  update,
  updatePassword,
  getAll,
  get,
};
