const expressJwt = require('express-jwt');
const prismaClient = require('@prisma/client');

const prisma = new prismaClient.PrismaClient();

const isRevoked = async (_req, payload, done) => {
  const id = payload.userId;
  console.log('id', id);
  const user = await prisma.user.findUnique({
    where: { id },
  });
  console.log('user', user);
  if (user != null) return done(null, true);

  return done();
};

const jwt = () => {
  const secret = process.env.JWT_SECRET;

  return expressJwt({
    secret,
    // isRevoked,
    algorithm: [process.env.JWT_ALGORITHM],
  }).unless({
    path: [
      { url: '/api/auth/login', methods: ['POST', 'OPTIONS'] },
      { url: '/api/users/create', methods: ['POST', 'OPTIONS'] },
    ],
  });
};

module.exports = jwt;
