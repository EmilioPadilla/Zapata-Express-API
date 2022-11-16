const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const hash = require('../src/utils/hash.js');

async function main() {
  await prisma.role.createMany({
    data: [
      { name: 'cliente' },
      { name: 'administrador' },
      { name: 'vendedor' },
      { name: 'analista' },
    ]
  });
  await prisma.client.create({
    data: {
      user: {
        create: {
          email: 'a01704889@tec.mx',
          password: await hash.hashItem('12345678'),
          name: 'Emilio Padilla Miranda',
          phone: '4622642021',
          token: '',
          role: {
            connect: {
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
              password: await hash.hashItem('12345678'),
              name: 'Rodrigo Montúfar',
              phone: '7721234568',
              token: '',
              role: {
                connect: {
                  name: 'vendedor',
                },
              },
            },
          },
        },
      },
      cars: {
        create: {
          startingKilometers: 1000,
          currentKilometers: 2000,
          image: '1',
          description: 'aire, pantalla, gps',
          model: {
            create: {
              name: 'MG',
              year: 2022,
              brand: {
                create: {
                  name: 'MG5',
                },
              },
            },
          },
          gps: {
            create: {
              alias: 'MG UPW173C',
            },
          },
        },
      },
    },
  });
    await prisma.client.create({
      data: {
        user: {
          create: {
            email: 'otramat@tec.mx',
            password: await hash.hashItem('12345678'),
            name: 'El del Jetta',
            phone: '4622642021',
            token: '',
            role: {
              connect: {
                name: 'cliente',
              },
            },
          },
        },
        employee: {
          create: {
            user: {
              create: {
                email: 'juanpablo@gmail.com',
                password: await hash.hashItem('12345678'),
                name: 'Juan Pablo que tiene cliente Jetta',
                phone: '7721234568',
                token: '',
                role: {
                  connect: {
                    name: 'vendedor',
                  },
                },
              },
            },
          },
        },
        cars: {
          create: {
            startingKilometers: 1000,
            currentKilometers: 2000,
            image: '1',
            description: 'aire, pantalla, gps',
            model: {
              create: {
                name: 'Volkswagen',
                year: 2022,
                brand: {
                  create: {
                    name: 'Jetta',
                  },
                },
              },
            },
            gps: {
              create: {
                alias: 'JETTA M06BEZ',
              },
            },
          },
        },
      },
    });
    await prisma.client.create({
      data: {
        user: {
          create: {
            email: 'unavezmas@tec.mx',
            password: await hash.hashItem('12345678'),
            name: 'El del Toyota',
            phone: '4622642021',
            token: '',
            role: {
              connect: {
                name: 'cliente',
              },
            },
          },
        },
        employee: {
          create: {
            user: {
              create: {
                email: 'juanpedro@gmail.com',
                password: await hash.hashItem('12345678'),
                name: 'Juan Pedro que tiene cliente Toyota',
                phone: '7721234568',
                token: '',
                role: {
                  connect: {
                    name: 'vendedor',
                  },
                },
              },
            },
          },
        },
        cars: {
          create: {
            startingKilometers: 1000,
            currentKilometers: 2000,
            image: '1',
            description: 'aire, pantalla, gps',
            model: {
              create: {
                name: 'Toyota',
                year: 2022,
                brand: {
                  create: {
                    name: 'Prius',
                  },
                },
              },
            },
            gps: {
              create: {
                alias: 'Toyota GX0740D',
              },
            },
          },
        },
      },
    });
    await prisma.client.create({
      data: {
        user: {
          create: {
            email: 'ydenuez@tec.mx',
            password: await hash.hashItem('12345678'),
            name: 'El del March',
            phone: '4622642021',
            token: '',
            role: {
              connect: {
                name: 'cliente',
              },
            },
          },
        },
        employee: {
          create: {
            user: {
              create: {
                email: 'juanjose@gmail.com',
                password: await hash.hashItem('12345678'),
                name: 'Juan Jose que tiene cliente March',
                phone: '7721234568',
                token: '',
                role: {
                  connect: {
                    name: 'vendedor',
                  },
                },
              },
            },
          },
        },
        cars: {
          create: {
            startingKilometers: 1000,
            currentKilometers: 2000,
            image: '1',
            description: 'aire, pantalla, gps',
            model: {
              create: {
                name: 'Nissan',
                year: 2022,
                brand: {
                  create: {
                    name: 'March',
                  },
                },
              },
            },
            gps: {
              create: {
                alias: 'MARCH UMK-019-A',
              },
            },
          },
        },
      },
    });
  await prisma.user.create({
    data: {
      email: 'matricula@tec.mx',
      password: await hash.hashItem('sacaprendeysorprende2022'),
      name: 'Emi Pérez',
      phone: '7721234567',
      token: 'sacaprendeysorprende2022',
      role: {
        connect: {
          name: 'administrador',
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
