/*
  Warnings:

  - You are about to drop the column `photographerName` on the `discount` table. All the data in the column will be lost.
  - You are about to drop the column `photographerName` on the `package` table. All the data in the column will be lost.
  - Added the required column `photographerId` to the `discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photographerId` to the `package` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "discount" DROP CONSTRAINT "discount_userId_fkey";

-- AlterTable
ALTER TABLE "discount" DROP COLUMN "photographerName",
ADD COLUMN     "photographerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "package" DROP COLUMN "photographerName",
ADD COLUMN     "photographerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "package" ADD CONSTRAINT "package_photographerId_fkey" FOREIGN KEY ("photographerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount" ADD CONSTRAINT "discount_photographerId_fkey" FOREIGN KEY ("photographerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
