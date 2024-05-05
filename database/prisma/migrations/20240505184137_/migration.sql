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

-- CreateIndex
CREATE UNIQUE INDEX "Screening_id_resident_key" ON "Screening"("id_resident");

-- CreateIndex
CREATE UNIQUE INDEX "Responsible_id_screening_key" ON "Responsible"("id_screening");

-- AddForeignKey
ALTER TABLE "Screening" ADD CONSTRAINT "Screening_id_resident_fkey" FOREIGN KEY ("id_resident") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responsible" ADD CONSTRAINT "Responsible_id_screening_fkey" FOREIGN KEY ("id_screening") REFERENCES "Screening"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Illnesses" ADD CONSTRAINT "Illnesses_screeningId_fkey" FOREIGN KEY ("screeningId") REFERENCES "Screening"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialNeeds" ADD CONSTRAINT "SpecialNeeds_screeningId_fkey" FOREIGN KEY ("screeningId") REFERENCES "Screening"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
