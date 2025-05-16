import { PrismaClient } from "@camaras/database/generated/database/client";

export class TimeService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  createTimeSlot(
    startTime: string,
    endTime: string,
    ampm: string,
    availableDayId: string
  ) {
    try {
      const newTimeSlot = this.prisma.timeSlot.create({
        data: {
          start: startTime,
          end: endTime,
          ampm,
          availableDayId,
        },
      });
      return newTimeSlot;
    } catch (error) {
      throw error;
    }
  }

  deleteTimeSlot(id: string) {
    try {
      const deletedTimeSlot = this.prisma.timeSlot.delete({
        where: {
          id,
        },
      });
      return deletedTimeSlot;
    } catch (error) {
      throw error;
    }
  }

  updateTimeSlot(
    id: string,
    startTime: string,
    endTime: string,
    ampm: string,
    availableDayId: string
  ) {
    try {
      const updatedTimeSlot = this.prisma.timeSlot.update({
        where: {
          id,
        },
        data: {
          start: startTime,
          end: endTime,
          ampm,
          availableDayId,
        },
      });
      return updatedTimeSlot;
    } catch (error) {
      throw error;
    }
  }
}
