/*
  Warnings:

  - You are about to drop the column `adressId` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the `adresses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "patients" DROP CONSTRAINT "patients_adressId_fkey";

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "adressId",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "uf" TEXT NOT NULL,
ADD COLUMN     "zipCode" INTEGER NOT NULL;

-- DropTable
DROP TABLE "adresses";
