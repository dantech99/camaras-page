import { apiClient } from "@/utils/api-connection";

interface UsersPagination {
  limit: number;
  offset: number;
}

export const UsersService = {
  getAll: async (query: UsersPagination) => {
    const response = await apiClient.users.index.get({
      query,
      fetch: {
        credentials: "include",
      },
    });

    return response.data;
  },

  updateRole: async (id: string, role: "user" | "admin" | "photographer") => {
    const response = await apiClient.users({ id }).put(
      {
        role,
      },
      {
        fetch: {
          credentials: "include",
        },
      }
    );

    return response.data;
  },
};
