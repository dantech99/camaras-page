/*
  Warnings:

  - You are about to drop the column `fullName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `hobbie` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "fullName",
DROP COLUMN "hobbie",
ADD COLUMN     "nameTag" TEXT;
