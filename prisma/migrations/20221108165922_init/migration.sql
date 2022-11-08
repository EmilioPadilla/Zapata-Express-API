-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
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
CREATE TABLE "Model" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "brandId" INTEGER NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gps" (
    "id" SERIAL NOT NULL,
    "alias" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "orientation" DOUBLE PRECISION,
    "velocity" DOUBLE PRECISION,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "Gps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "token" TEXT,
    "idRole" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "token" TEXT,
    "birthDate" TIMESTAMP(3),
    "address" TEXT,
    "licenceValidity" TIMESTAMP(3),
    "idSeller" INTEGER NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "idUser" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "Seller" (
    "idEmployee" INTEGER NOT NULL,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("idEmployee")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Permit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Office" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Office_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarHasService" (
    "idCar" INTEGER NOT NULL,
    "idService" INTEGER NOT NULL,
    "dateOfService" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarHasService_pkey" PRIMARY KEY ("idCar","idService")
);

-- CreateTable
CREATE TABLE "ServiceHasType" (
    "idService" INTEGER NOT NULL,
    "idType" INTEGER NOT NULL,

    CONSTRAINT "ServiceHasType_pkey" PRIMARY KEY ("idService","idType")
);

-- CreateTable
CREATE TABLE "RoleHasPermit" (
    "idRole" INTEGER NOT NULL,
    "idPermit" INTEGER NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoleHasPermit_pkey" PRIMARY KEY ("idPermit","idRole")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Gps_alias_key" ON "Gps"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "Gps_carId_key" ON "Gps"("carId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gps" ADD CONSTRAINT "Gps_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idRole_fkey" FOREIGN KEY ("idRole") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_idSeller_fkey" FOREIGN KEY ("idSeller") REFERENCES "Seller"("idEmployee") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_idEmployee_fkey" FOREIGN KEY ("idEmployee") REFERENCES "Employee"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarHasService" ADD CONSTRAINT "CarHasService_idCar_fkey" FOREIGN KEY ("idCar") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarHasService" ADD CONSTRAINT "CarHasService_idService_fkey" FOREIGN KEY ("idService") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceHasType" ADD CONSTRAINT "ServiceHasType_idService_fkey" FOREIGN KEY ("idService") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceHasType" ADD CONSTRAINT "ServiceHasType_idType_fkey" FOREIGN KEY ("idType") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleHasPermit" ADD CONSTRAINT "RoleHasPermit_idRole_fkey" FOREIGN KEY ("idRole") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleHasPermit" ADD CONSTRAINT "RoleHasPermit_idPermit_fkey" FOREIGN KEY ("idPermit") REFERENCES "Permit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
