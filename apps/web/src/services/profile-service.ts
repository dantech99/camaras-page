import { apiClient } from "@/utils/api-connection";

export const ProfileService = {
  getProfile: async () => {
    const response = await apiClient.profile.index.get({
      fetch: {
        credentials: "include",
      },
    });

    return response.data;
  },
};
