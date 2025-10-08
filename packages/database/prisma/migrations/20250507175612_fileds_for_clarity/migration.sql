-- AlterTable
ALTER TABLE "available_day" ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "date" SET DATA TYPE TEXT;
