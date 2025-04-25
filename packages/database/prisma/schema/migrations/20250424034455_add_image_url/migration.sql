/*
  Warnings:

  - Added the required column `imageUrl` to the `PhotoPackage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PhotoPackage" ADD COLUMN     "imageUrl" TEXT NOT NULL;
