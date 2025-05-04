import { PrismaClient } from "@camaras/database/generated/database";

export class SessionsService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createAvailableDay(
    date: string,
    timeSlots: { start: string; end: string }[],
    userId: string
  ) {
    const availableDay = await this.prisma.availableDay.create({
      data: {
        date: new Date(date),
        userId,
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

    return availableDay;
  }

  async getAvailableDays(userId: string) {
    return this.prisma.availableDay.findMany({
      where: {
        userId,
      },
      include: {
        timeSlots: true,
      },
      orderBy: {
        date: "asc",
      },
    });
  }

  async updateAvailableDay(
    dayId: string,
    timeSlots: { start: string; end: string }[]
  ) {
    // First delete existing time slots
    await this.prisma.timeSlot.deleteMany({
      where: {
        availableDayId: dayId,
      },
    });

    // Then create new time slots
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
}
