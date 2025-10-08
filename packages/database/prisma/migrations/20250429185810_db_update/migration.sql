/*
  Warnings:

  - You are about to drop the `ChangeLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DescriptionBullets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DiscountCode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DiscountHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PhotoPackage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionLogs` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('ROLE_UPDATE', 'DISCOUNT_CREATED', 'PACKAGE_UPDATED', 'FUNDS_TRANSFER', 'USER_STATUS_CHANGED', 'PACKAGE_CREATED', 'DISCOUNT_DEACTIVATED', 'TRANSACTION_REFUND');

-- CreateEnum
CREATE TYPE "AuditEntity" AS ENUM ('USER', 'DISCOUNT', 'PACKAGE', 'TRANSACTION', 'ORGANIZATION');

-- DropForeignKey
ALTER TABLE "ChangeLog" DROP CONSTRAINT "ChangeLog_changedById_fkey";

-- DropForeignKey
ALTER TABLE "ChangeLog" DROP CONSTRAINT "ChangeLog_packageId_fkey";

-- DropForeignKey
ALTER TABLE "DescriptionBullets" DROP CONSTRAINT "DescriptionBullets_photoPackageId_fkey";

-- DropForeignKey
ALTER TABLE "DiscountCode" DROP CONSTRAINT "DiscountCode_photographerId_fkey";

-- DropForeignKey
ALTER TABLE "DiscountHistory" DROP CONSTRAINT "DiscountHistory_discountCodeId_fkey";

-- DropForeignKey
ALTER TABLE "DiscountHistory" DROP CONSTRAINT "DiscountHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_packageId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "PhotoPackage" DROP CONSTRAINT "PhotoPackage_photographerId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_packageId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_discountCodeId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_packageId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionLogs" DROP CONSTRAINT "TransactionLogs_userFromId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionLogs" DROP CONSTRAINT "TransactionLogs_userToId_fkey";

-- DropTable
DROP TABLE "ChangeLog";

-- DropTable
DROP TABLE "DescriptionBullets";

-- DropTable
DROP TABLE "DiscountCode";

-- DropTable
DROP TABLE "DiscountHistory";

-- DropTable
DROP TABLE "Favorite";

-- DropTable
DROP TABLE "PhotoPackage";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "Sale";

-- DropTable
DROP TABLE "TransactionLogs";

-- CreateTable
CREATE TABLE "audit_log" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "action" "AuditAction" NOT NULL,
    "entityType" "AuditEntity" NOT NULL,
    "entityId" TEXT NOT NULL,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "targetUserId" TEXT,
    "userId" TEXT,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package" (
    "id" TEXT NOT NULL,
    "photographerName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "photoCount" INTEGER NOT NULL DEFAULT 0,
    "discountPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package_feature" (
    "id" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "package_feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discountPercentage" DOUBLE PRECISION NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "photographerName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "discount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "audit_log_entityType_idx" ON "audit_log"("entityType");

-- CreateIndex
CREATE INDEX "audit_log_action_idx" ON "audit_log"("action");

-- CreateIndex
CREATE UNIQUE INDEX "discount_code_key" ON "discount"("code");

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_feature" ADD CONSTRAINT "package_feature_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discount" ADD CONSTRAINT "discount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
