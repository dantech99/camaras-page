import { prisma } from "@camaras/api/src/modules/prisma";

export class PhotographerService {
  async getAllPhotographers() {
    try {
      const photographers = await prisma.user.findMany({
        where: {
          role: "photographer",
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
      const packages = await prisma.photoPackage.findMany({
        where: {
          photographerId,
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
}
