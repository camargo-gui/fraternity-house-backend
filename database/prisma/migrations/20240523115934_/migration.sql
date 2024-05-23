/*
  Warnings:

  - The `status` column on the `Resident` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Resident" DROP COLUMN "status",
ADD COLUMN     "status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "ResidentStatus";
