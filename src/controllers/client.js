const prismaClient = require('@prisma/client');
const createHttpError = require('http-errors');
const hash = require('@utils/hash.js');

const prisma = new prismaClient.PrismaClient();

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const client = await prisma.client.findUnique({
      where: { email },
    });

    if (client == null) throw createHttpError[403]('Invalid credentials');

    const validPassword = await hash.validateItem(password, client.password);

    if (!validPassword) throw createHttpError[403]('Invalid credentials');

    // Create the access token with express jwt
    const accessToken = 'the token';

    const response = await prisma.client.update({
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
    const { name, email, password, phone, birthDate, address, licenceValidity } = req.body;

    const client = await prisma.client.findUnique({
      where: { email },
    });

    if (client != null) throw createHttpError[409]('Email already taken');

    const result = await prisma.client.create({
      data: {
        //Get id of client from user table
        name,
        email,
        password: await hash.hashItem(password),
        phone,
        birthDate: new Date(birthDate),
        address,
        licenceValidity: new Date(licenceValidity),
      },
    });
    
    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const clients = await prisma.client.findMany();

    return res.json(clients);
  } catch (error) {
    return next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (client == null) throw createHttpError[404]('No client found');

    return res.json(client);
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, email, phone,birthDate,address,licenceValidity } = req.body;
    const id = Number(req.params.id);
 
    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (client == null) throw createHttpError[404]('No client found');

    const response = await prisma.client.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        birthDate: new Date(birthDate),
        address,
        licenceValidity: new Date(licenceValidity),
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
    console.log(previousPassword,newPassword);
    const id = Number(req.params.id);

    const client = await prisma.client.findUnique({
      where: { id },
    });
    
    if (client == null) throw createHttpError[404]('No client found');

    const validPassword = await hash.validateItem(previousPassword, client.password);

    if (!validPassword) throw createHttpError[401]('No matching password');

    const response = await prisma.client.update({
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
