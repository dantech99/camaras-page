/*
  Warnings:

  - Added the required column `photographerId` to the `DiscountCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiscountCode" ADD COLUMN     "photographerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "DiscountCode" ADD CONSTRAINT "DiscountCode_photographerId_fkey" FOREIGN KEY ("photographerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
