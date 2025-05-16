import { apiClient } from "@/utils/api-connection";

export const TimeService = {
  create: async (data: any) => {
    const response = await apiClient.time.index.post(data, {
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.time({ id }).delete(null, {
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await apiClient.time({ id }).patch(data, {
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },
};
