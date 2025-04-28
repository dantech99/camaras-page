import { apiClient } from "@/utils/api-connection";

export const PhotographersService = {
  getAll: async () => {
    const response = await apiClient.photographer.index.get();
    return response.data;
  },

  getPhotographerPackages: async () => {
    const response = await apiClient.photographer.my_packages.get({
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },
};
