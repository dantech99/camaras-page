import { PrismaClient } from "@camaras/database";

export class DayService {

    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    createDay(date: string, userId: string) {
        try {
            const newDay = this.prisma.availableDay.create({
                data: {
                    date,
                    isAvailable: true,
                    userId,
                },
            });
            return newDay;
        } catch (error) {
            throw error;
        }
    }

    deleteDay(id: string, userId: string) {
        try {

            // First delete all time slots of the day
            this.prisma.timeSlot.deleteMany({
                where: {
                    availableDayId: id,
                },
            });

            const deletedDay = this.prisma.availableDay.delete({
                where: {
                    id,
                    userId,
                },
            });
            return deletedDay;
        } catch (error) {
            throw error;
        }
    }

    getDays(userId: string) {
        try {
            const days = this.prisma.availableDay.findMany({
                where: {
                    userId,
                },
            });
            return days;
        } catch (error) {
            throw error;
        }
    }

    getDay(id: string, userId: string) {
        try {
            const day = this.prisma.availableDay.findUnique({
                where: {
                    id,
                    userId,
                },
                include: {
                    timeSlots: true,
                },
            });
            return day;
        } catch (error) {
            throw error;
        }
    }
}