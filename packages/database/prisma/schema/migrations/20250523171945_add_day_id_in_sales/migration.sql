/*
  Warnings:

  - Added the required column `dayId` to the `sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountPercentage` to the `sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeSlotId` to the `sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sale" ADD COLUMN     "dayId" TEXT NOT NULL,
ADD COLUMN     "discountPercentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "timeSlotId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "available_day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "time_slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
