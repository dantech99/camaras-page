import { apiClient } from "@/utils/api-connection";

export const PhotographersService = {
  getAll: async () => {
    const response = await apiClient.photographer.index.get();
    return response.data;
  },

  getPackageFromPhotographer: async (id: string) => {

    console.log("entrando a la función", id)

    const response = await apiClient.photographer({photographerId: id}).get({
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },
};
