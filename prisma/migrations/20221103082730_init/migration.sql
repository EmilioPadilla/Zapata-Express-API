-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "token" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "token" TEXT,
    "birthDate" TIMESTAMP(3),
    "address" TEXT,
    "licenceValidity" TIMESTAMP(3),

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "brandId" INTEGER NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "initialKilometers" INTEGER NOT NULL,
    "currentKilometers" INTEGER,
    "geofenceRadius" DOUBLE PRECISION NOT NULL DEFAULT 150,
    "velocityLimit" DOUBLE PRECISION NOT NULL DEFAULT 20,
    "image" TEXT NOT NULL,
    "description" TEXT,
    "insurancePolicyValidity" TIMESTAMP(3),
    "verificationValidity" TIMESTAMP(3),
    "circulationCardValidity" TIMESTAMP(3) NOT NULL,
    "modelId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gps" (
    "id" SERIAL NOT NULL,
    "Alias" TEXT NOT NULL,
    "Latitud" TEXT,
    "Longitud" TEXT,
    "Bateria" INTEGER,
    "FechaDispositivo" TEXT,
    "Altitud" DOUBLE PRECISION,
    "Velocidad" DOUBLE PRECISION,
    "Orientacion" DOUBLE PRECISION,
    "ErrorMtsGps" DOUBLE PRECISION,
    "NivelGsm" DOUBLE PRECISION,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "Gps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Gps_alias_key" ON "Gps"("Alias");

-- CreateIndex
CREATE UNIQUE INDEX "Gps_carId_key" ON "Gps"("carId");

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gps" ADD CONSTRAINT "Gps_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
