-- CreateTable
CREATE TABLE "available_day" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "available_day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_slot" (
    "id" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "availableDayId" TEXT NOT NULL,

    CONSTRAINT "time_slot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "available_day" ADD CONSTRAINT "available_day_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_slot" ADD CONSTRAINT "time_slot_availableDayId_fkey" FOREIGN KEY ("availableDayId") REFERENCES "available_day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
