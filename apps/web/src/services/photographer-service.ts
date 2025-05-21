import { apiClient } from "@/utils/api-connection";

export const PhotographersService = {
  getAll: async () => {
    const response = await apiClient.photographer.index.get();
    return response.data;
  },

  getPackageFromPhotographer: async (id: string) => {
    const response = await apiClient.photographer({photographerId: id}).get({
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },

  getAvailableDays: async (id: string) => {
    const response = await apiClient.photographer.available({ photographerId: id }).get({
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  }
};
