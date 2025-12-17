-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DIRECTOR');

-- CreateEnum
CREATE TYPE "NominationStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'DIRECTOR',
    "companyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nomination" (
    "id" TEXT NOT NULL,
    "status" "NominationStatus" NOT NULL DEFAULT 'DRAFT',
    "programId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "nomineeName" TEXT NOT NULL,
    "nomineeEmail" TEXT,
    "nomineeRole" TEXT,
    "justification" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nomination_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Nomination_programId_status_idx" ON "Nomination"("programId", "status");

-- CreateIndex
CREATE INDEX "Nomination_createdById_idx" ON "Nomination"("createdById");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nomination" ADD CONSTRAINT "Nomination_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nomination" ADD CONSTRAINT "Nomination_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
