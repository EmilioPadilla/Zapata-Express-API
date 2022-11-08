const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const cliente1 = await prisma.client.create({
    data:{
      user:{
        create:{
          email: 'suaj@gmail.com',
          password: '123456',
          name: 'Juan Pérez',
          phone: '7721234567',
          token: 'sacasdfaeqdas123',
          role:{
            create:{
              type: 'cliente',
            }
          }
        }
      },
      seller:{
        create:{
          employee:{
            create:{
                user:{
                  create:{
                    email: 'vendedor1@gmail.com',
                    password: '123456',
                    name: 'Juan Pérez',
                    phone: '7721234568',
                    token: 'sacasdfaeqdas123',
                    role:{
                      create:{
                        type: 'vendedor',
                      }
                    }  
                }
              }
            }
          }
        }
      },
      cars:{
        create:{
          currentKilometers: 2000,
          image: '1',
          description: 'aire, pantalla, gps',
          circulationCardValidity: '2022-01-20T12:01:30.543Z',
          model:{
            create:{
              name: 'CX3',
              year: '2000',
              brand:{
                create:{
                  name: 'Mazda',
                }
              }
            }
          }
        }
      }

    }
})

const permiso1 = await prisma.permit.create({
  data:{
    name: "editar",
    description: "Puede editar usuarios",
  }
})
const permisoTieneRole = await prisma.roleHasPermit.create({
  data:{
    idPermit: 1,
    idRole: 1,
  }
})
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })