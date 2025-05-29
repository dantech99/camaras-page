import { apiClient } from "@/utils/api-connection";

export const UsersService = {
  getAll: async () => {
    const response = await apiClient.users.index.get({
      fetch: {
        credentials: "include",
      }
    });

    console.log(response.data);

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
