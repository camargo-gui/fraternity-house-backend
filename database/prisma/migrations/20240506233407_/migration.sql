-- CreateEnum
CREATE TYPE "AccompanimentType" AS ENUM ('PSYCHOLOGIST', 'PHYSIOTHERAPIST', 'NUTRITIONIST');

-- CreateTable
CREATE TABLE "Accompaniment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "residentId" INTEGER NOT NULL,
    "type" "AccompanimentType" NOT NULL,

    CONSTRAINT "Accompaniment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Accompaniment" ADD CONSTRAINT "Accompaniment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accompaniment" ADD CONSTRAINT "Accompaniment_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
