import { apiClient } from "@/utils/api-connection";

interface CreateSessionDto {
  date: string;
  timeSlots: { start: string; end: string }[];
}

interface UpdateSessionDto {
  timeSlots: { start: string; end: string }[];
}

export const SessionsService = {
  create: async (values: CreateSessionDto) => {
    const response = await apiClient.sessions.index.post(values, {
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.sessions.index.get({
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },

  update: async (id: string, values: UpdateSessionDto) => {
    const response = await apiClient.sessions({ id }).put(values, {
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },
};
