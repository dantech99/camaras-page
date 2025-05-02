import { prisma } from "@camaras/api/src/modules/prisma";

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
          tiktokUrl: true,
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
      facebookUrl: string;
      instagramUrl: string;
      tiktokUrl: string;
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
          facebookUrl: data.facebookUrl,
          instagramUrl: data.instagramUrl,
          tiktokUrl: data.tiktokUrl,
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

  async updateAdditionalInformation(
    userId: string,
    data: {
      fullName: string;
      website: string;
      location: string;
      hobbie: string;
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

      await prisma.user.update({
        where: { id: userId },
        data: {
          fullName: data.fullName,
          website: data.website,
          location: data.location,
          hobbie: data.hobbie,
        },
      });

      return {
        message: "Additional information updated successfully",
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
