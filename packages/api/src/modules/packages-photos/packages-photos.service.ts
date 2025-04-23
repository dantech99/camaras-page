import { prisma } from "../prisma";

export class PackageService {
  async createPackage(
    data: {
      name: string;
      description: string;
      price: number;
      photosCount: number;
      dotsDescription: string[];
    },
    user: { id: string }
  ) {
    try {
      const { name, description, price, dotsDescription, photosCount } = data;

      const photoPackage = await prisma.photoPackage.create({
        data: {
          name,
          description,
          price,
          photoCount: photosCount,
          dotsDescription: dotsDescription,
          photographerId: user.id,
          isActive: true,
          discountPercentage: 0,
        },
      });

      return {
        message: "Package created successfully",
        status: 201,
        photoPackage,
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

  async getPackagesFromPhotographer(photographerId: string) {
    try {
      const packages = await prisma.photoPackage.findMany({
        where: {
          photographerId,
        },
      });

      return {
        message: "Packages retrieved successfully",
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

  async updatePackage(
    id: string,
    data: {
      name: string;
      description: string;
      price: number;
      photosCount: number;
      dotsDescription: string[];
      isActive?: boolean;
      discountPercentage?: number;
    },
    user: { id: string }
  ) {
    try {
      const {
        name,
        description,
        price,
        dotsDescription,
        photosCount,
        isActive,
        discountPercentage,
      } = data;

      const photoPackage = await prisma.photoPackage.update({
        where: {
          id,
          photographerId: user.id,
        },
        data: {
          photographerId: user.id,
          name,
          description,
          price,
          photoCount: photosCount,
          dotsDescription: dotsDescription,
          isActive: isActive,
          discountPercentage: discountPercentage,
        },
      });

      return {
        message: "Package updated successfully",
        status: 200,
        photoPackage,
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

  async deletePackage(id: string, user: { id: string }) {
    try {
      await prisma.photoPackage.delete({
        where: {
          id,
          photographerId: user.id,
        },
      });

      return {
        message: "Package deleted successfully",
        status: 200,
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
