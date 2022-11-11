const expressJwt = require('express-jwt');

const jwt = () => {
  const secret = process.env.JWT_SECRET;

  return expressJwt({
    secret,
    algorithm: [process.env.JWT_ALGORITHM],
  }).unless({
    path: [
      { url: '/api/auth/login', methods: ['POST', 'OPTIONS'] },
      { url: '/api/users/create', methods: ['POST', 'OPTIONS'] },
    ],
  });
};

module.exports = jwt;
