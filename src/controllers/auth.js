//US Movil 1-2 US Web 1-2
const jwt = require('jsonwebtoken');
const prismaClient = require('@prisma/client');
const createHttpError = require('http-errors');
const hash = require('@utils/hash.js');

const prisma = new prismaClient.PrismaClient();

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (user == null) throw createHttpError[403]('Invalid credentials');

    const validPassword = await hash.validateItem(password, user.password);

    if (!validPassword) throw createHttpError[403]('Invalid credentials');

    const accessToken = jwt.sign({ userId: user.id, roleId: user.roleId }, process.env.JWT_SECRET);

    const authenticadedUser = await prisma.user.update({
      where: { email },
      include: {
        role: true,
      },
      data: {
        token: accessToken,
      },
    });

    return res.json({
      name: authenticadedUser.name,
      userId: authenticadedUser.id,
      role: authenticadedUser.role.name,
      token: authenticadedUser.token,
    });
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (email == null) throw createHttpError[403]('Invalid credentials');

    await prisma.user.update({
      where: { email },
      data: {
        token: null,
      },
    });

    return res.json({
      message: 'Successfully logged out',
    });
  } catch (error) {
    return next(error);
  }
};

const getRoles = async (_req, res, next) => {
  try {
    const roles = await prisma.role.findMany();

    return res.json(roles);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
  logout,
  getRoles,
};
