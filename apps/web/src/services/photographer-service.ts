import axios from "axios";

const photographersClient = axios.create({
  baseURL: "http://localhost:8080/api/photographer",
});

export const PhotographersService = {
  getAll: async () => {
    const response = await photographersClient.get("");
    return response.data;
  },
};
