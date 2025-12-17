/*
  Warnings:

  - You are about to drop the column `createdById` on the `Nomination` table. All the data in the column will be lost.
  - You are about to drop the column `justification` on the `Nomination` table. All the data in the column will be lost.
  - You are about to drop the column `nomineeEmail` on the `Nomination` table. All the data in the column will be lost.
  - You are about to drop the column `nomineeName` on the `Nomination` table. All the data in the column will be lost.
  - You are about to drop the column `nomineeRole` on the `Nomination` table. All the data in the column will be lost.
  - You are about to drop the column `programId` on the `Nomination` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Nomination` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Nomination` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Program` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[dni]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `text` to the `Nomination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Nomination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dni` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Nomination" DROP CONSTRAINT "Nomination_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Nomination" DROP CONSTRAINT "Nomination_programId_fkey";

-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_companyId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyId_fkey";

-- DropIndex
DROP INDEX "Nomination_createdById_idx";

-- DropIndex
DROP INDEX "Nomination_programId_status_idx";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Nomination" DROP COLUMN "createdById",
DROP COLUMN "justification",
DROP COLUMN "nomineeEmail",
DROP COLUMN "nomineeName",
DROP COLUMN "nomineeRole",
DROP COLUMN "programId",
DROP COLUMN "status",
DROP COLUMN "updatedAt",
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "companyId",
DROP COLUMN "email",
DROP COLUMN "role",
DROP COLUMN "updatedAt",
ADD COLUMN     "dni" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "Program";

-- DropEnum
DROP TYPE "NominationStatus";

-- DropEnum
DROP TYPE "Role";

-- CreateIndex
CREATE INDEX "Nomination_userId_idx" ON "Nomination"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_dni_key" ON "User"("dni");

-- AddForeignKey
ALTER TABLE "Nomination" ADD CONSTRAINT "Nomination_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
