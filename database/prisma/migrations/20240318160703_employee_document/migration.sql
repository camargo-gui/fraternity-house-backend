/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `document` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Employee_phone_key";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "document" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_document_key" ON "Employee"("document");
