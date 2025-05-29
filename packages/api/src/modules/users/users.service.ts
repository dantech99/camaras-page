import { prisma } from "@camaras/api/src/modules/prisma";
import { auth } from "@camaras/auth/index";

export class UsersService {
  async getUsers( headers: Record<string, string>) {
    try {
      const users = await auth.api.listUsers({
        query: {
          limit: 10,
        },
        headers,
      });

      const totalUsers = users.total;

      return {
        users: users.users,
        pagination: {
          totalUsers,
        },
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
    headers: Record<string, string>
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

      const updatedUser = await auth.api.setRole({
        headers,
        body: {
          userId: id,
          role: role as "user" | "admin" | "photographer",
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
