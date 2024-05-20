-- CreateEnum
CREATE TYPE "ResidentStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Resident" ADD COLUMN     "status" "ResidentStatus" NOT NULL DEFAULT 'ACTIVE';
