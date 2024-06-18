-- AlterTable
ALTER TABLE "Resident" ADD COLUMN     "nutritionistStatus" TEXT DEFAULT 'Undefined',
ADD COLUMN     "physicalStatus" TEXT DEFAULT 'Undefined',
ADD COLUMN     "psychologicalStatus" TEXT DEFAULT 'Undefined';
