/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transfers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transfers" DROP CONSTRAINT "Transfers_fromId_fkey";

-- DropForeignKey
ALTER TABLE "Transfers" DROP CONSTRAINT "Transfers_toId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_addressId_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Transactions";

-- DropTable
DROP TABLE "Transfers";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "EnumStatusAccount";

-- DropEnum
DROP TYPE "StatementType";

-- DropEnum
DROP TYPE "TransactionType";

-- CreateTable
CREATE TABLE "Resident" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact_phone" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacologicalName" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PharmacologicalName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pharmaceutical_forms" TEXT NOT NULL,
    "id_pharmacological_name" INTEGER NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resident_cpf_key" ON "Resident"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Resident_rg_key" ON "Resident"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Resident_contact_phone_key" ON "Resident"("contact_phone");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_phone_key" ON "Employee"("phone");

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_id_pharmacological_name_fkey" FOREIGN KEY ("id_pharmacological_name") REFERENCES "PharmacologicalName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
