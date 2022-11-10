const prismaClient = require('@prisma/client');
const createHttpError = require('http-errors');

const prisma = new prismaClient.PrismaClient();

// Get all ✔
const getAll = async (_req, res, next) => {
    try {
        const models = await prisma.model.findMany();

        return res.json(models);
    } catch (error) {
        return next(error);
    }
};

// Get by ID ✔
const get = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const model = await prisma.model.findUnique({
            where: { id },
        });

        if (model == null) throw createHttpError[404]('No model found 👉🏼👈🏼');

        return res.json(model);
    } catch (error) {
        return next(error);
    }
};

// Create model -- Faltan Endpoints de modelos ✔
const create = async (req, res, next) => {
    try {
        const { name, year, brandId } = req.body;

        const brand= await prisma.brand.findUnique({
            where:{id: brandId}
        });
        
        if(brand==null) throw createHttpError[404]("brand no found");

        const result = await prisma.model.create({
            data: {
                name,
                year,
                brand: {
                    connect: {
                        id: brandId,
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
        const { name, year} = req.body;
        const id = Number(req.params.id);
  
      const model = await prisma.model.findUnique({
        where: { id },
      });
  
      if (model == null) throw createHttpError[404]('No model found 👉🏼👈🏼');
  
      const response = await prisma.model.update({
        where: { id },
        data: {
            name,
            year,
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
    create,
    update,
};
