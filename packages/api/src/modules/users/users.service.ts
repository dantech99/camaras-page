import { ImageService } from "@camaras/api/src/modules/images/images.service";
import { prisma } from "@camaras/api/src/modules/prisma";

export class UsersService {
  private imageService: ImageService;

  constructor() {
    this.imageService = new ImageService();
  }

  async getUsers() {
    try {
      const users = await prisma.user.findMany();

      return {
        message: "Users fetched successfully",
        status: 200,
        users,
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
