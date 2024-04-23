/*
  Warnings:

  - You are about to drop the column `created_at` on the `MedicationSheet` table. All the data in the column will be lost.
  - You are about to drop the column `dosage` on the `MedicationSheet` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `MedicationSheet` table. All the data in the column will be lost.
  - You are about to drop the column `frequency` on the `MedicationSheet` table. All the data in the column will be lost.
  - You are about to drop the column `medicalPrescription` on the `MedicationSheet` table. All the data in the column will be lost.
  - You are about to drop the column `medicineId` on the `MedicationSheet` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `MedicationSheet` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `MedicationSheet` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `MedicationSheet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MedicationSheet" DROP CONSTRAINT "MedicationSheet_medicineId_fkey";

-- AlterTable
ALTER TABLE "MedicationSheet" DROP COLUMN "created_at",
DROP COLUMN "dosage",
DROP COLUMN "endDate",
DROP COLUMN "frequency",
DROP COLUMN "medicalPrescription",
DROP COLUMN "medicineId",
DROP COLUMN "startDate",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" INTEGER NOT NULL,
ADD COLUMN     "observations" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Prescription" (
    "id" SERIAL NOT NULL,
    "medicationSheetId" INTEGER NOT NULL,
    "medicineId" INTEGER NOT NULL,
    "dosage" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "firstTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Prescription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MedicationSheet" ADD CONSTRAINT "MedicationSheet_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_medicationSheetId_fkey" FOREIGN KEY ("medicationSheetId") REFERENCES "MedicationSheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
