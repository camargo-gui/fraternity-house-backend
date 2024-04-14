/*
  Warnings:

  - Added the required column `id_pharmacological_form` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "id_pharmacological_form" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PharmacologicalForm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "PharmacologicalForm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_id_pharmacological_form_fkey" FOREIGN KEY ("id_pharmacological_form") REFERENCES "PharmacologicalForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
