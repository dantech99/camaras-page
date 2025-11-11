/*
  Warnings:

  - You are about to drop the `package_feature` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "package_feature" DROP CONSTRAINT "package_feature_packageId_fkey";

-- DropTable
DROP TABLE "package_feature";
