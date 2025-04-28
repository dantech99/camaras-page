import { apiClient } from "@/utils/api-connection";

interface CreatePackagePhotoDto {
  name: string;
  description: string;
  dotsDescription: string[];
  price: number;
  photosCount: number;
  image: File | null;
}

interface UpdatePackageDto {
  name: string;
  description: string;
  price: number;
  dotsDescription: string[];
  discountPercentage?: number;
  photosCount: number;
  isActive?: boolean;
}

export const PackageService = {
  getAll: async () => {
    const response = await apiClient.package.index.get({
      fetch: {
        credentials: "include",
      },
    });

    return response.data;
  },

  create: async (dto: CreatePackagePhotoDto) => {
    const response = await apiClient.package.index.post(dto, {
      fetch: {
        credentials: "include",
      },
    });

    return response.data;
  },

  update: async (id: string, body: UpdatePackageDto) => {
    const response = await apiClient
      .package({
        id: id,
      })
      .patch(body, {
        fetch: {
          credentials: "include",
        },
      });

    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient
      .package({
        id,
      })
      .delete({
        fetch: {
          credentials: "include",
        },
      });

    return response.data;
  },
};
