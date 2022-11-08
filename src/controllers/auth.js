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

    const accessToken = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, {
      algorithm: process.env.JWT_ALGORITHM,
      expiresIn: '1d',
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

module.exports = {
  login,
};
