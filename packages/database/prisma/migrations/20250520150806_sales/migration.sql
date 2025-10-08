/*
  Warnings:

  - You are about to drop the column `userId` on the `audit_log` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'CREDIT_CARD', 'NEQUI');

-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED', 'PARTIAL');

-- DropForeignKey
ALTER TABLE "audit_log" DROP CONSTRAINT "audit_log_userId_fkey";

-- AlterTable
ALTER TABLE "audit_log" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "sale" (
    "id" TEXT NOT NULL,
    "saleStatus" "SaleStatus" NOT NULL DEFAULT 'PENDING',
    "photographerId" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "discountCodeId" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "finalPrice" DOUBLE PRECISION NOT NULL,
    "cancelledAt" TIMESTAMP(3),
    "cancelledById" TEXT,
    "methodPayment" "PaymentMethod" NOT NULL,
    "paymentConfirmation" BOOLEAN NOT NULL DEFAULT false,
    "paymentConfirmationAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sale_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_photographerId_fkey" FOREIGN KEY ("photographerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_discountCodeId_fkey" FOREIGN KEY ("discountCodeId") REFERENCES "discount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_cancelledById_fkey" FOREIGN KEY ("cancelledById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
