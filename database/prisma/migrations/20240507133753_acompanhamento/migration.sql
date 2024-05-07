-- CreateEnum
CREATE TYPE "MovimentationType" AS ENUM ('INPUT', 'OUTPUT');

-- CreateEnum
CREATE TYPE "MeasurementType" AS ENUM ('UNITY', 'KG', 'L');

-- CreateEnum
CREATE TYPE "AccompanimentType" AS ENUM ('PSYCHOLOGIST', 'PHYSIOTHERAPIST', 'NUTRITIONIST');

-- CreateTable
CREATE TABLE "Resident" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact_phone" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "url_image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "document" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacologicalName" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "PharmacologicalName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacologicalForm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "PharmacologicalForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "id_pharmacological_name" INTEGER NOT NULL,
    "id_pharmacological_form" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicationSheet" (
    "id" SERIAL NOT NULL,
    "residentId" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "observations" TEXT,

    CONSTRAINT "MedicationSheet_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "measurement" "MeasurementType" NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movimentation" (
    "id" SERIAL NOT NULL,
    "type" "MovimentationType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "id_employee" INTEGER NOT NULL,

    CONSTRAINT "Movimentation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductMovimentation" (
    "id" SERIAL NOT NULL,
    "id_product" INTEGER NOT NULL,
    "id_movimentation" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "ProductMovimentation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Screening" (
    "id" SERIAL NOT NULL,
    "religion" TEXT NOT NULL,
    "smoking" BOOLEAN NOT NULL,
    "entry_date" TIMESTAMP(3) NOT NULL,
    "father_name" TEXT NOT NULL,
    "mother_name" TEXT NOT NULL,
    "source_of_income" TEXT NOT NULL,
    "income" DOUBLE PRECISION NOT NULL,
    "health_insurance" TEXT NOT NULL,
    "funeral_insurance" TEXT NOT NULL,
    "number_of_sibling" INTEGER NOT NULL,
    "number_of_children" INTEGER NOT NULL,
    "number_of_grandchildren" INTEGER NOT NULL,
    "id_resident" INTEGER NOT NULL,

    CONSTRAINT "Screening_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responsible" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "kinship" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "civil_state" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "id_screening" INTEGER NOT NULL,

    CONSTRAINT "Responsible_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Illnesses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "screeningId" INTEGER NOT NULL,

    CONSTRAINT "Illnesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecialNeeds" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "screeningId" INTEGER NOT NULL,

    CONSTRAINT "SpecialNeeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accompaniment" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "residentId" INTEGER NOT NULL,
    "type" "AccompanimentType" NOT NULL,

    CONSTRAINT "Accompaniment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resident_cpf_key" ON "Resident"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Resident_rg_key" ON "Resident"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Resident_contact_phone_key" ON "Resident"("contact_phone");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_document_key" ON "Employee"("document");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Screening_id_resident_key" ON "Screening"("id_resident");

-- CreateIndex
CREATE UNIQUE INDEX "Responsible_id_screening_key" ON "Responsible"("id_screening");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_id_pharmacological_name_fkey" FOREIGN KEY ("id_pharmacological_name") REFERENCES "PharmacologicalName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_id_pharmacological_form_fkey" FOREIGN KEY ("id_pharmacological_form") REFERENCES "PharmacologicalForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicationSheet" ADD CONSTRAINT "MedicationSheet_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicationSheet" ADD CONSTRAINT "MedicationSheet_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_medicationSheetId_fkey" FOREIGN KEY ("medicationSheetId") REFERENCES "MedicationSheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimentation" ADD CONSTRAINT "Movimentation_id_employee_fkey" FOREIGN KEY ("id_employee") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductMovimentation" ADD CONSTRAINT "ProductMovimentation_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductMovimentation" ADD CONSTRAINT "ProductMovimentation_id_movimentation_fkey" FOREIGN KEY ("id_movimentation") REFERENCES "Movimentation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Screening" ADD CONSTRAINT "Screening_id_resident_fkey" FOREIGN KEY ("id_resident") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responsible" ADD CONSTRAINT "Responsible_id_screening_fkey" FOREIGN KEY ("id_screening") REFERENCES "Screening"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Illnesses" ADD CONSTRAINT "Illnesses_screeningId_fkey" FOREIGN KEY ("screeningId") REFERENCES "Screening"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialNeeds" ADD CONSTRAINT "SpecialNeeds_screeningId_fkey" FOREIGN KEY ("screeningId") REFERENCES "Screening"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accompaniment" ADD CONSTRAINT "Accompaniment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accompaniment" ADD CONSTRAINT "Accompaniment_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
