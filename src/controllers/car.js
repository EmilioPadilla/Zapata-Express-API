const prismaClient = require('@prisma/client');
const createHttpError = require('http-errors');

const prisma = new prismaClient.PrismaClient();

const getAll = async (_req, res, next) => {
  try {
    const cars = await prisma.car.findMany({
      include: {
        model: {
          include: {
            brand: true,
          },
        },
		image: {}
      },
    });

    return res.json(cars);
  } catch (error) {
    return next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const car = await prisma.car.findUnique({
      where: { id },
		include: {
			image: {}
		}
    });

    if (car == null) throw createHttpError[404]('No car found');

    return res.json(car);
  } catch (error) {
    return next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const car = await prisma.car.findUnique({
      where: { id },
    });

    if (car == null) throw createHttpError[404]('No car found');

    const response = await prisma.car.delete({
      where: { id },
    });

    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

const getByClientId = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const cars = await prisma.car.findMany({
      where: { clientId: id },
      include: {
        model: {
          include: {
            brand: true,
          },
        },
		image: true,
		gps: true
      },
    });

    if (cars == null) throw createHttpError[404]('No cars on this client');

    return res.json(cars);
  } catch (error) {
    return next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { startingKilometers, image, description, modelId, clientId } = req.body;

    const model = await prisma.model.findUnique({
      where: { id: modelId },
    });

    if (model == null) throw createHttpError[404]('No model found');

    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (client == null) throw createHttpError[404]('No client found');

    const result = await prisma.car.create({
      data: {
        startingKilometers,
        currentKilometers: startingKilometers,
        image,
        description,
        model: {
          connect: {
            id: modelId,
          },
        },
        client: {
          connect: {
            id: clientId,
          },
        },
      },
    });

    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { startingKilometers, currentKilometers, image, description, modelId } = req.body;
    const id = Number(req.params.id);

    const car = await prisma.car.findUnique({
      where: { id },
    });

    if (car == null) throw createHttpError[404]('No car found');

    const response = await prisma.car.update({
      where: { id },
      data: {
        startingKilometers,
        currentKilometers,
        image,
        description,
        model: {
          connect: {
            id: modelId,
          },
        },
      },
    });

    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

  const updateVerification = async (req, res, next) => {
    try {
      const { verificationValidity } = req.body;
      const id = Number(req.params.id);
      
      const car = await prisma.car.findUnique({
        where: { id },
      });
  
      if (car == null) throw createHttpError[404]('No client found');
  
      const response = await prisma.car.update({
        where: { id },
        data: {
          verificationValidity: new Date(verificationValidity),
        },
      });
  
      return res.json(response);
    } catch (error) {
      return next(error);
    }
  };

  const updatePolicy = async (req, res, next) => {
    try {
      const { insurancePolicyValidity } = req.body;
      const id = Number(req.params.id);
      
      const car = await prisma.car.findUnique({
        where: { id },
      });
  
      if (car == null) throw createHttpError[404]('No car found');
  
      const response = await prisma.car.update({
        where: { id },
        data: {
          insurancePolicyValidity: new Date(insurancePolicyValidity),
        },
      });
  
      return res.json(response);
    } catch (error) {
      return next(error);
    }
  };
  const updateCirculation = async (req, res, next) => {
    try {
      const { circulationCardValidity } = req.body;
      const id = Number(req.params.id);
      
      const car = await prisma.car.findUnique({
        where: { id },
      });
  
      if (car == null) throw createHttpError[404]('No car found');
  
      const response = await prisma.car.update({
        where: { id },
        data: {
          circulationCardValidity: new Date(circulationCardValidity),
        },
      });
  
      return res.json(response);
    } catch (error) {
      return next(error);
    }
  };

  const updateMaxVelocity = async (req, res, next) => {
    try {
      const { velocityLimit } = req.body;

      const id = Number(req.params.id);

      const car = await prisma.car.findUnique({
        where: { id },
      });

      if (car == null) throw createHttpError[404]('No car found');

      const response = await prisma.car.update({
        where: { id },
        data: {
          velocityLimit: velocityLimit,
        },
      });

      return res.json(response);
    } catch (error) {
      return next(error);
    }
  };

module.exports = {
  getAll,
  get,
  remove,
  create,
  update,
  getByClientId,
  updateVerification,
  updatePolicy,
  updateCirculation,
  updateMaxVelocity
};
