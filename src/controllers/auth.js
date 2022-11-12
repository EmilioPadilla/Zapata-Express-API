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

    const accessToken = jwt.sign({ userId: user.id, roleId: user.role.id }, process.env.JWT_SECRET, {
      algorithm: process.env.JWT_ALGORITHM,
      expiresIn: '1800s',
    });

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

    res.json({
      message: 'Successfully logged out',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
  logout,
};
