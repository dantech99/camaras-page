import { apiClient } from "@/utils/api-connection";

export const DaysService = {
  create: async (date: string) => {
    const response = await apiClient.day.index.post(
      { date },
      {
        fetch: {
          credentials: "include",
        },
      }
    );
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.day({ id }).delete(
      null,
      {
        fetch: {
          credentials: "include",
        },
      }
    );
    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.day.index.get({
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await apiClient.day({ id }).get({
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },
};
