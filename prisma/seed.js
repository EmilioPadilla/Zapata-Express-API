const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const hash = require('../src/utils/hash.js');

async function main() {
  await prisma.client.create({
    data: {
      user: {
        create: {
          email: 'suaj@gmail.com',
          password: await hash.hashItem('123456'),
          name: 'Juan Pérez',
          phone: '7721234567',
          token: 'sacaprendeysorprende2022',
          role: {
            create: {
              name: 'cliente',
            },
          },
        },
      },
      employee: {
        create: {
          user: {
            create: {
              email: 'a@gmail.com',
              password: await hash.hashItem('123456'),
              name: 'Juan Pérez',
              phone: '7721234568',
              token: 'sacaprendeysorprende2022',
              role: {
                create: {
                  name: 'vendedor',
                },
              },
            },
          },
        },
      },
      cars: {
        create: {
          currentKilometers: 2000,
          image: '1',
          description: 'aire, pantalla, gps',
          circulationCardValidity: '2022-01-20T12:01:30.543Z',
          model: {
            create: {
              name: 'CX3',
              year: '2000',
              brand: {
                create: {
                  name: 'Mazda',
                },
              },
            },
          },
        },
      },
    },
  });
  await prisma.user.create({
    data: {
      email: 'a01704889@tec.mx',
      password: await hash.hashItem('sacaprendeysorprende2022'),
      name: 'Emi Pérez',
      phone: '7721234567',
      token: 'sacaprendeysorprende2022',
      role: {
        create: {
          name: 'admin',
        },
      },
    },
  });
  // 1 => Crear
  // 2 => Leer
  // 3 => Actualizar
  // 4 => Borrar
  await prisma.permit.create({
    data: {
      name: 'crear',
      description: 'Puede crear usuarios',
    },
  });

  await prisma.permit.create({
    data: {
      name: 'visualizar',
      description: 'Puede visualizar usuarios',
    },
  });

  await prisma.permit.create({
    data: {
      name: 'editar',
      description: 'Puede editar usuarios',
    },
  });

  await prisma.permit.create({
    data: {
      name: 'borrar',
      description: 'Puede borrar usuarios',
    },
  });

  // 1 => Cliente
  // 2 => Vendedor
  // 3 => Admin

  // Cliente only reads
  await prisma.roleHasPermit.create({
    data: {
      idRole: 1,
      idPermit: 2,
    },
  });
  
  // Vendedor
  await prisma.roleHasPermit.create({
    data: {
      idRole: 2,
      idPermit: 1,
    },
  });
  await prisma.roleHasPermit.create({
    data: {
      idRole: 2,
      idPermit: 2,
    },
  });
  await prisma.roleHasPermit.create({
    data: {
      idRole: 2,
      idPermit: 3,
    },
  });
  // Admin has all permits
  await prisma.roleHasPermit.create({
    data: {
      idRole: 3,
      idPermit: 1,
    },
  });
  await prisma.roleHasPermit.create({
    data: {
      idRole: 3,
      idPermit: 2,
    },
  });
  await prisma.roleHasPermit.create({
    data: {
      idRole: 3,
      idPermit: 3,
    },
  });
  await prisma.roleHasPermit.create({
    data: {
      idRole: 3,
      idPermit: 4,
    },
  });
}
main()
.then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
