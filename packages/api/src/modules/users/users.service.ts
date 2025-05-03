import { prisma } from "@camaras/api/src/modules/prisma";
import { auth } from "@camaras/auth/index";

export class UsersService {
  async getUsers(
    headers: Record<string, string>,
    query: {
      limit: number;
      offset: number;
      email?: string;
      role?: "user" | "admin" | "photographer";
    }
  ) {
    try {
      const users = await auth.api.listUsers({
        headers,
        query: {
          limit: query.limit,
          offset: query.offset,
          searchField: query.email ? "email" : undefined,
          searchOperator: query.email ? "contains" : undefined,
          searchValue: query.email,
          filterField: query.role ? "role" : undefined,
          filterOperator: query.role ? "eq" : undefined,
          filterValue: query.role,
        },
      });

      const totalUsers = users.total;
      const totalPages = Math.ceil(totalUsers / query.limit);
      const currentPage = Math.floor(query.offset / query.limit) + 1;
      const hasNextPage = currentPage < totalPages;
      const hasPreviousPage = currentPage > 1;

      return {
        users: users.users,
        pagination: {
          totalUsers,
          totalPages,
          currentPage,
          limit: query.limit,
          offset: query.offset,
          hasNextPage,
          hasPreviousPage,
          nextPage: hasNextPage ? currentPage + 1 : null,
          previousPage: hasPreviousPage ? currentPage - 1 : null,
          startIndex: query.offset + 1,
          endIndex: Math.min(query.offset + query.limit, totalUsers),
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
