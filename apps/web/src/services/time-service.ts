import { apiClient } from "@/utils/api-connection";

export const TimeService = {
  create: async (data: {
    startTime: string;
    endTime: string;
    ampmStart: string;
    ampmEnd: string;
    availableDayId: string;
  }) => {
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

  update: async (id: string, data: {
    startTime: string;
    endTime: string;
    ampmStart: string;
    ampmEnd: string;
    availableDayId: string;
  }) => {
    const response = await apiClient.time({ id }).patch(data, {
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },
};
