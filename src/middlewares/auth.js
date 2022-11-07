const expressJwt = require('express-jwt');
const prismaClient = require('@prisma/client');

const prisma = prismaClient.PrismaClient();

const isRevoked = async (_req, payload, done) => {
  const subject = payload.sub;
  const user = await prisma.user.findUnique({
    where: { id: subject },
  });

  if (user != null) return done(null, true);

  return done();
};

const jwt = () => {
  const secret = process.env.JWT_SECRET;

  return expressJwt({
    secret,
    isRevoked,
    algorithm: ['RS256'],
  }).unless({
    path: ['/login'],
  });
};

module.exports = {
  jwt,
};
