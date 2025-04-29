/*
  Warnings:

  - You are about to drop the column `dotsDescription` on the `PhotoPackage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PhotoPackage" DROP COLUMN "dotsDescription";

-- CreateTable
CREATE TABLE "DescriptionBullets" (
    "id" TEXT NOT NULL,
    "photoPackageId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "DescriptionBullets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DescriptionBullets" ADD CONSTRAINT "DescriptionBullets_photoPackageId_fkey" FOREIGN KEY ("photoPackageId") REFERENCES "PhotoPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
