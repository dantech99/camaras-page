import { prisma } from "@camaras/api/src/modules/prisma";
import { PrismaClientKnownRequestError } from "@camaras/database/generated/database/runtime/library";

export class ProfileService {
  async getProfile(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          image: true,
          description: true,
          facebookUrl: true,
          instagramUrl: true,
        },
      });

      return {
        message: "Profile fetched successfully",
        status: 200,
        user,
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

  async updateProfile(
    userId: string,
    data: {
      name: string;
      description: string;
      facebookUrl: string;
      instagramUrl: string;
    }
  ) {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data,
      });

      if (!user) {
        return {
          message: "User not found",
          status: 404,
        };
      }

      // Update the user with the information
      await prisma.user.update({
        where: { id: userId },
        data: {
          name: data.name,
          description: data.description,
          facebookUrl: data.facebookUrl,
          instagramUrl: data.instagramUrl,
        },
      });

      return {
        message: "Profile updated successfully",
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
