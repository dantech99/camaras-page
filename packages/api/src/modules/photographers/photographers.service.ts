import { prisma } from "@camaras/api/src/modules/prisma";

export class PhotographerService {
  async getAllPhotographers() {
    try {
      const photographers = await prisma.user.findMany({
        where: {
          role: {
            contains: "photographer",
          }
        },
      });

      return {
        message: "Photographers retrieved successfully",
        status: 200,
        photographers,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          message: error.message,
          status: 500,
        };
      }

      return {
        message: "An unknown error occurred",
        status: 500,
      };
    }
  }

  async getPhotographerPackages(photographerId: string) {
    try {
      const packages = await prisma.package.findMany({
        where: {
          photographerId,
          deletedAt: null,
        },
      });

      return {
        message: "Photographer packages retrieved successfully",
        status: 200,
        packages,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          message: error.message,
          status: 500,
        };
      }

      return {
        message: "An unknown error occurred",
        status: 500,
      };
    }
  }

  async getAvailablePhotographerPackages(photographerId: string) {
    try {
      const days = await prisma.availableDay.findMany({
        where: {
          userId: photographerId,
          timeSlots: {
            some: {
              isBooked: false,
            },
          },
        },
        select: {
          id: true,
          date: true,
          timeSlots: {
            where: {
              isBooked: false,
            },
            select: {
              id: true,
              start: true,
              end: true,
              ampmStart: true,
              ampmEnd: true,
            },
          },
        },
      });

      const availableDays = days.map(day => ({
        day: day.date,
        dayId: day.id,
        timeSlots: day.timeSlots.map(slot => ({
          id: slot.id,
          start: slot.start,
          end: slot.end,
          ampmStart: slot.ampmStart,
          ampmEnd: slot.ampmEnd,
        })),
      }));

      return {
        message: "Schedule retrieved successfully",
        status: 200,
        availableDays,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          message: error.message,
          status: 500,
        };
      }

      return {
        message: "An unknown error occurred",
        status: 500,
      };
    }
  }
}
