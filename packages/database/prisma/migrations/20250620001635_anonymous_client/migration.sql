/*
  Warnings:

  - You are about to drop the column `buyerId` on the `sale` table. All the data in the column will be lost.
  - Added the required column `buyerCharacter` to the `sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyerEmail` to the `sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyerName` to the `sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyerPhoneNumber` to the `sale` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sale" DROP CONSTRAINT "sale_buyerId_fkey";

-- AlterTable
ALTER TABLE "sale" DROP COLUMN "buyerId",
ADD COLUMN     "buyerCharacter" TEXT NOT NULL,
ADD COLUMN     "buyerEmail" TEXT NOT NULL,
ADD COLUMN     "buyerName" TEXT NOT NULL,
ADD COLUMN     "buyerPhoneNumber" TEXT NOT NULL;
