/*
  Warnings:

  - You are about to drop the column `userId` on the `Nomination` table. All the data in the column will be lost.
  - Added the required column `directorId` to the `Nomination` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Nomination" DROP CONSTRAINT "Nomination_userId_fkey";

-- DropIndex
DROP INDEX "Nomination_userId_idx";

-- AlterTable
ALTER TABLE "Nomination" DROP COLUMN "userId",
ADD COLUMN     "directorId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Nomination_directorId_idx" ON "Nomination"("directorId");

-- AddForeignKey
ALTER TABLE "Nomination" ADD CONSTRAINT "Nomination_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
