import axios from "axios";

interface CreatePackagePhotoDto {
  name: string;
  description: string;
  dotsDescription: string[];
  price: number;
  photosCount: number;
  image: File | null;
}

const packagePhotosClient = axios.create({
  baseURL: "http://localhost:8080/api/packages-photos",
});

export const PackagePhotosService = {
  getAll: async (id: string) => {
    const response = await packagePhotosClient.get(`/${id}`);
    return response.data;
  },

  create: async (dto: CreatePackagePhotoDto) => {
    const formData = new FormData();

    formData.append("name", dto.name);
    formData.append("description", dto.description);
    formData.append("price", dto.price.toString());
    formData.append("photosCount", dto.photosCount.toString());

    if (dto.image) {
      formData.append("image", dto.image);
    }

    dto.dotsDescription.forEach((dot) => {
      formData.append("dotsDescription", dot);
    });

    const response = await packagePhotosClient.post("/", formData, {
      withCredentials: true,
    });

    return response.data;
  },
};
