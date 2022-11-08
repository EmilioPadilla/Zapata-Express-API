const jwt = require('jsonwebtoken');
const prismaClient = require('@prisma/client');
const createHttpError = require('http-errors');

const prisma = prismaClient.PrismaClient();

const hasPermit = (permitName) => {
  return async (req, _res, next) => {
    try {
      const token = req.header('x-auth-token');
      const { userId, roleId } = jwt.verify(token, process.env.JWT_SECRET);

      const user = prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (user == null) throw createHttpError[401]('You need to be logged in');

      const permit = prisma.permit.upsert({
        where: {
          name: permitName,
        },
        update: {},
        create: {
          name: permitName,
        },
      });

      const rolePermits = prisma.roleHasPermits.findUnique({
        where: {
          permit: {
            id: permit.id,
          },
          role: {
            id: roleId,
          },
        },
      });
      if (rolePermits == null) throw createHttpError[403]('You have no permit to do this action');

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = hasPermit;
