const prismaClient = require('@prisma/client');
const createHttpError = require('http-errors');

const prisma = new prismaClient.PrismaClient();

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: String(email) },
    });

    if (user != null) throw createHttpError[409]('Email already taken');

    const result = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    res.json(result);
  } catch (error) {
    return next(error);
  }
};

const getUsers = async (_req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  getUsers,
};
