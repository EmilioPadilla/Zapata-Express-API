/*
  Warnings:

  - You are about to drop the column `idSeller` on the `Client` table. All the data in the column will be lost.
  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idUser` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the `CarHasService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Seller` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceHasType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sellerId` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `officeId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `year` on the `Model` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `name` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CarHasService" DROP CONSTRAINT "CarHasService_idCar_fkey";

-- DropForeignKey
ALTER TABLE "CarHasService" DROP CONSTRAINT "CarHasService_idService_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_idSeller_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_idUser_fkey";

-- DropForeignKey
ALTER TABLE "Seller" DROP CONSTRAINT "Seller_idEmployee_fkey";

-- DropForeignKey
ALTER TABLE "ServiceHasType" DROP CONSTRAINT "ServiceHasType_idService_fkey";

-- DropForeignKey
ALTER TABLE "ServiceHasType" DROP CONSTRAINT "ServiceHasType_idType_fkey";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "idSeller",
ADD COLUMN     "sellerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_pkey",
DROP COLUMN "idUser",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD COLUMN     "officeId" INTEGER NOT NULL,
ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Model" DROP COLUMN "year",
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "type",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RoleHasPermit" ALTER COLUMN "update_date" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "CarHasService";

-- DropTable
DROP TABLE "Seller";

-- DropTable
DROP TABLE "Service";

-- DropTable
DROP TABLE "ServiceHasType";

-- DropTable
DROP TABLE "Type";

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "Office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
