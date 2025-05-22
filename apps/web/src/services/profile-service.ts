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

  updateMainInformation: async (data: {
    image?: File;
    description?: string;
  }) => {
    const response = await apiClient.profile.main.patch(data, {
      fetch: {
        credentials: "include",
      },
    });

    return response.data;
  },

  updateSocials: async (data: {
    facebookUrl?: string;
    instagramUrl?: string;
    tiktokUrl?: string;
  }) => {
    const response = await apiClient.profile.socials.patch(data, {
      fetch: {
        credentials: "include",
      },
    });

    return response.data;
  },

  updateAdditionalInformation: async (data: {
    nameTag: string;
    website: string;
    location: string;
    phoneNumber: string;
  }) => {
    const response = await apiClient.profile.additional.patch(data, {
      fetch: {
        credentials: "include",
      },
    });

    return response.data;
  },
};
