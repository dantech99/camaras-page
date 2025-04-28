import { apiClient } from "@/utils/api-connection";

export const PhotographersService = {
  getAll: async () => {
    const response = await apiClient.photographer.index.get();
    return response.data;
  },

  getPackageFromPhotographer: async (id: string) => {
    const response = await apiClient.photographer.index.get({
      query: {
        id,
      },
    });
    return response.data;
  },
};
