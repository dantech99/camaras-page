import { apiClient } from "@/utils/api-connection";

export const PackageService = {
  getAll: async () => {
    const response = await apiClient.package.index.get({
      fetch: {
        credentials: "include",
      },
    });

    return response.data;
  },

  create: async (dto: {
    name: string;
    description: string;
    price: number;
    photoCount: number;
    image: File;
  }) => {
    const response = await apiClient.package.index.post(
      {
        name: dto.name,
        image: dto.image,
        description: dto.description,
        price: dto.price.toString(),
        photoCount: dto.photoCount.toString(),
      },
      {
        fetch: {
          credentials: "include",
        },
      }
    );

    return response.data;
  },

  update: async (id: string, body: {
    name: string;
    description: string;
    price: string;
    photoCount: string;
    image?: File;
    isActive: boolean;
  }) => {
    const updateData = {
      name: body.name,
      description: body.description,
      price: body.price,
      photoCount: body.photoCount,
      isActive: body.isActive,
      ...(body.image ? { image: body.image } : {}),
    };

    const response = await apiClient
      .package({
        id: id,
      })
      .patch(updateData, {
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
      .delete(null, {
        fetch: {
          credentials: "include",
        },
      });
    return response.data;
  },
};
