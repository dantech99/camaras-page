import { PrismaClient } from "@camaras/database/generated/database";

export class SessionsService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll(userId: string) {
    try {
      const availableDays = await this.prisma.availableDay.findMany({
        where: {
          userId,
        },
        include: {
          timeSlots: true,
        },
      });

      return availableDays;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string) {
    try {
      const availableDay = await this.prisma.availableDay.findUnique({
        where: {
          id,
        },
        select: {
          date: true,
          timeSlots: {
            select: {
              start: true,
              end: true,
              availableDay: true,
              id: true,
              isBooked: true,
            },
          },
        },
      });

      if (!availableDay) {
        throw new Error("Available day not found");
      }

      return {
        date: availableDay.date,
        timeSlots: availableDay.timeSlots.map((slot) => ({
          start: slot.start,
          end: slot.end,
          id: slot.id,
          isBooked: slot.isBooked,
        })),
      };
    } catch (error) {
      throw error;
    }
  }

  async createAvailableDay(
    date: string,
    userId: string
  ) {
    const availableDay = await this.prisma.availableDay.create({
      data: {
        date,
        userId,
      },
      include: {
        timeSlots: true,
      },
    });

    return availableDay;
  }

  async addSlotsTime(
    dayId: string,
    timeSlots: { start: string; end: string }[]
  ) {
    await this.prisma.timeSlot.deleteMany({
      where: {
        availableDayId: dayId,
      },
    });

    const updatedDay = await this.prisma.availableDay.update({
      where: {
        id: dayId,
      },
      data: {
        timeSlots: {
          create: timeSlots.map((slot) => ({
            start: slot.start,
            end: slot.end,
          })),
        },
      },
      include: {
        timeSlots: true,
      },
    });

    return updatedDay;
  }

  async updateSlotsTime(
    dayId: string,
    timeSlots: { start: string; end: string }[]
  ) {
    await this.prisma.timeSlot.deleteMany({
      where: {
        availableDayId: dayId,
      },
    });

    const updatedDay = await this.prisma.availableDay.update({
      where: {
        id: dayId,
      },
      data: {
        timeSlots: {
          create: timeSlots.map((slot) => ({
            start: slot.start,
            end: slot.end,
          })),
        },
      },
      include: {
        timeSlots: true,
      },
    });

    return updatedDay;
  }

  async updateOnlyOneSlot(
    dayId: string,
    start: string,
    end: string
  ) {
    await this.prisma.timeSlot.deleteMany({
      where: {
        availableDayId: dayId,
      },
    });

    const updatedDay = await this.prisma.availableDay.update({
      where: {
        id: dayId,
      },
      data: {
        timeSlots: {
          create: [{
            start,
            end,
          }],
        },
      },
      include: {
        timeSlots: true,
      },
    });

    return updatedDay;
  }

  async deleteAvailableDay(
    dayId: string,
    userId: string
  ) {

    const availableDay = await this.prisma.availableDay.findUnique({
      where: {
        id: dayId,
        userId,
      },
    });

    if (!availableDay) {
      throw new Error("Available day not found");
    }

    // Delete the slots associated with the available day
    await this.prisma.timeSlot.deleteMany({
      where: {
        availableDayId: dayId,
      },
    });

    await this.prisma.availableDay.delete({
      where: {
        id: dayId,
      },
    });
  }
}
