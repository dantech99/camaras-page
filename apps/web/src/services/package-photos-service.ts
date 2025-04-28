import { apiClient } from "@/utils/api-connection";

interface CreatePackagePhotoDto {
  name: string;
  description: string;
  dotsDescription: string[];
  price: string;
  photosCount: string;
  image: File | undefined;
}

export const PackagePhotosService = {
  getAll: async (id: string) => {
    const response = await apiClient
      .packages_photos({
        id: id,
      })
      .get();
    return response.data;
  },

  create: async (dto: CreatePackagePhotoDto) => {
    const response = await apiClient.packages_photos.index.post(dto);

    return response.data;
  },
};
