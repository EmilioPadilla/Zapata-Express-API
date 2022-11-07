/*
  Warnings:

  - You are about to drop the column `Alias` on the `Gps` table. All the data in the column will be lost.
  - You are about to drop the column `Altitud` on the `Gps` table. All the data in the column will be lost.
  - You are about to drop the column `Bateria` on the `Gps` table. All the data in the column will be lost.
  - You are about to drop the column `ErrorMtsGps` on the `Gps` table. All the data in the column will be lost.
  - You are about to drop the column `FechaDispositivo` on the `Gps` table. All the data in the column will be lost.
  - You are about to drop the column `Latitud` on the `Gps` table. All the data in the column will be lost.
  - You are about to drop the column `Longitud` on the `Gps` table. All the data in the column will be lost.
  - You are about to drop the column `NivelGsm` on the `Gps` table. All the data in the column will be lost.
  - You are about to drop the column `Orientacion` on the `Gps` table. All the data in the column will be lost.
  - You are about to drop the column `Velocidad` on the `Gps` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[alias]` on the table `Gps` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alias` to the `Gps` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Gps_Alias_key";

-- AlterTable
ALTER TABLE "Gps" DROP COLUMN "Alias",
DROP COLUMN "Altitud",
DROP COLUMN "Bateria",
DROP COLUMN "ErrorMtsGps",
DROP COLUMN "FechaDispositivo",
DROP COLUMN "Latitud",
DROP COLUMN "Longitud",
DROP COLUMN "NivelGsm",
DROP COLUMN "Orientacion",
DROP COLUMN "Velocidad",
ADD COLUMN     "alias" TEXT NOT NULL,
ADD COLUMN     "altitude" TEXT,
ADD COLUMN     "battery" TEXT,
ADD COLUMN     "date" TEXT,
ADD COLUMN     "gsmLevel" TEXT,
ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "longitude" TEXT,
ADD COLUMN     "mtsError" TEXT,
ADD COLUMN     "orientation" TEXT,
ADD COLUMN     "velocity" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Gps_alias_key" ON "Gps"("alias");
