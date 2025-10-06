/*
  Warnings:

  - Added the required column `ampm` to the `time_slot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "time_slot" ADD COLUMN     "ampm" TEXT NOT NULL;
