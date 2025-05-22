import { prisma } from "@camaras/api/src/modules/prisma";
import { ImageService } from "../images/images.service";

export class ProfileService {
  private imageService: ImageService;

  constructor() {
    this.imageService = new ImageService();
  }

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
          nameTag: true,
          website: true,
          location: true,
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

  async updateMainInformation(
    userId: string,
    data: {
      image?: File | undefined;
      description?: string;
    }
  ) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return {
          message: "User not found",
          status: 404,
        };
      }

      let image = user.image;

      if (data.image) {
        const imageService = new ImageService();

        // Si la imagen actual no es de Google y existe, la eliminamos
        if (
          user.image &&
          !user.image.startsWith("https://lh3.googleusercontent.com")
        ) {
          await imageService.deleteImage(user.image);
        }

        image = await imageService.createImage(
          data.image,
          userId,
          "photographer"
        );
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          image: image,
          description: data.description,
        },
      });
    } catch (error) {}
  }

  async updateSocials(
    userId: string,
    data: {
      facebookUrl?: string;
      instagramUrl?: string;
      tiktokUrl?: string;
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
      nameTag?: string;
      website?: string;
      location?: string;
      phoneNumber?: string;
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
          nameTag: data.nameTag,
          website: data.website,
          location: data.location,
          phoneNumber: data.phoneNumber,
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
