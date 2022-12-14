const prismaClient = require('@prisma/client');
const createHttpError = require('http-errors');
const hash = require('@utils/hash.js');

const prisma = new prismaClient.PrismaClient();

const create = async (req, res, next) => {
  try {
    const { name, email, password, phone, roleId } = req.body;

    const employee = await prisma.user.findUnique({
      where: { email },
    });

    if (employee != null) throw createHttpError[409]('Email already taken');

    const result = await prisma.employee.create({
      data: {
        user: {
          create: {
            name,
            email,
            password: await hash.hashItem(password),
            phone,
            role: {
              connect: {
                id: roleId,
              }
            },
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
    const employees = await prisma.employee.findMany({
      include: {
        user: {
          include: {
            role: true,
          },
        },
      },
    });

    return res.json(employees);
  } catch (error) {
    return next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: { user: true },
    });

    if (employee == null) throw createHttpError[404]('No employee found');

    return res.json(employee);
  } catch (error) {
    return next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: { user: true },
    });

    if (employee == null) throw createHttpError[404]('No employee found');

    const response = await prisma.employee.delete({
      where: { id },
    });

    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, email, phone, roleId } = req.body;
    const id = Number(req.params.id);

    const employee = await prisma.employee.findUnique({
      where: { id },
    });

    if (employee == null) throw createHttpError[404]('No employee found');

    const response = await prisma.employee.update({
      where: { id },
      data: {
        user: {
          update: {
            name,
            email,
            phone,
            role: {
              connect: {
                id: roleId
              }
            }
          },
        },
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

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: { user: true },
    });

    if (employee == null) throw createHttpError[404]('No employee found');

    const validPassword = await hash.validateItem(previousPassword, employee.user.password);

    if (!validPassword) throw createHttpError[401]('No matching password');

    const response = await prisma.employee.update({
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
  update,
  remove,
  updatePassword,
  getAll,
  get,
};
