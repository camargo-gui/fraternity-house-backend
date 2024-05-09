/*
  Warnings:

  - You are about to drop the column `screeningId` on the `Illnesses` table. All the data in the column will be lost.
  - You are about to drop the column `screeningId` on the `SpecialNeeds` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Illnesses" DROP CONSTRAINT "Illnesses_screeningId_fkey";

-- DropForeignKey
ALTER TABLE "SpecialNeeds" DROP CONSTRAINT "SpecialNeeds_screeningId_fkey";

-- AlterTable
ALTER TABLE "Illnesses" DROP COLUMN "screeningId";

-- AlterTable
ALTER TABLE "SpecialNeeds" DROP COLUMN "screeningId";

-- CreateTable
CREATE TABLE "_ScreeningToSpecialNeeds" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_IllnessesToScreening" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ScreeningToSpecialNeeds_AB_unique" ON "_ScreeningToSpecialNeeds"("A", "B");

-- CreateIndex
CREATE INDEX "_ScreeningToSpecialNeeds_B_index" ON "_ScreeningToSpecialNeeds"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_IllnessesToScreening_AB_unique" ON "_IllnessesToScreening"("A", "B");

-- CreateIndex
CREATE INDEX "_IllnessesToScreening_B_index" ON "_IllnessesToScreening"("B");

-- AddForeignKey
ALTER TABLE "_ScreeningToSpecialNeeds" ADD CONSTRAINT "_ScreeningToSpecialNeeds_A_fkey" FOREIGN KEY ("A") REFERENCES "Screening"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScreeningToSpecialNeeds" ADD CONSTRAINT "_ScreeningToSpecialNeeds_B_fkey" FOREIGN KEY ("B") REFERENCES "SpecialNeeds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IllnessesToScreening" ADD CONSTRAINT "_IllnessesToScreening_A_fkey" FOREIGN KEY ("A") REFERENCES "Illnesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IllnessesToScreening" ADD CONSTRAINT "_IllnessesToScreening_B_fkey" FOREIGN KEY ("B") REFERENCES "Screening"("id") ON DELETE CASCADE ON UPDATE CASCADE;
