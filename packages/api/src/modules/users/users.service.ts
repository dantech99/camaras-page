import { prisma } from "@camaras/api/src/modules/prisma";
import { auth } from "@camaras/auth/index";

export class UsersService {
  async getUsers() {
    try {
      const users = await auth.api.listUsers({
        query: {
          limit: 100,
        },
      });

      return {
        users: users.users,
      };
    } catch (error) {
      console.log(error);
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

  async updateUserRole(
    id: string,
    role: "user" | "admin" | "photographer",
  ) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        return {
          message: "User not found",
          status: 404,
        };
      }

      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          role,
        },
      });

      return {
        message: "User role updated successfully",
        status: 200,
        updatedUser,
      };
    } catch (error) {
      return {
        message: "An unknown error occurred",
        status: 500,
      };
    }
  }
}
