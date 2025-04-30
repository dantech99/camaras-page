import { apiClient } from "@/utils/api-connection";

interface CreatePackagePhotoDto {
  name: string;
  description: string;
  price: number;
  photoCount: number;
  image: File;
  descriptionBullets: { content: string }[];
}

interface UpdatePackageDto {
  name: string;
  description: string;
  price: string;
  photoCount: string;
  image: File;
  descriptionBullets: string[];
  isActive: string;
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
    const response = await apiClient.package.index.post(
      {
        name: dto.name,
        image: dto.image,
        description: dto.description,
        price: dto.price.toString(),
        photoCount: dto.photoCount.toString(),
        descriptionBullets: JSON.stringify(dto.descriptionBullets),
      },
      {
        fetch: {
          credentials: "include",
        },
      }
    );

    return response.data;
  },

  update: async (id: string, body: UpdatePackageDto) => {
    const response = await apiClient
      .package({
        id: id,
      })
      .patch(
        {
          name: body.name,
          description: body.description,
          price: body.price.toString(),
          photoCount: body.photoCount.toString(),
          image: body.image,
          descriptionBullets: JSON.stringify(
            body.descriptionBullets.map((content) => ({ content }))
          ),
          isActive: body.isActive,
        },
        {
          fetch: {
            credentials: "include",
          },
        }
      );

    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient
      .package({
        id,
      })
      .delete(null, {
        fetch: {
          credentials: "include",
        },
      });
    return response.data;
  },
};
