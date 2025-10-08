/*
  Warnings:

  - You are about to drop the column `ampm` on the `time_slot` table. All the data in the column will be lost.
  - Added the required column `ampmEnd` to the `time_slot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ampmStart` to the `time_slot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "time_slot" DROP COLUMN "ampm",
ADD COLUMN     "ampmEnd" TEXT NOT NULL,
ADD COLUMN     "ampmStart" TEXT NOT NULL;
