import { apiClient } from "@/utils/api-connection";

interface CreateSessionDto {
  date: string;
}

interface UpdateSessionDto {
  timeSlots: { start: string; end: string }[];
}

export const SessionsService = {
  
  getAll: async () => {
    const response = await apiClient.sessions.index.get({
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.sessions({
      id,
    }).get({
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },
  
  createDay: async (values: CreateSessionDto) => {
    const response = await apiClient.sessions.day.post(values, {
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },

  addSlots: async (id: string, values: UpdateSessionDto) => {
    const response = await apiClient.sessions.slots.post({
      ...values,
      id,
    },{
      fetch: {
        credentials: "include",
      }
    });
    return response.data;
  },

  updateSlots: async (id: string, values: UpdateSessionDto) => {
    const response = await apiClient.sessions.slots.put({
      ...values,
      id,
    },{
      fetch: {
        credentials: "include",
      }
    });
    return response.data;
  },

  updateOneSlot: async (id: string, values: UpdateSessionDto) => {
    const response = await apiClient.sessions.slots.put({
      ...values,
      id,
    },{
      fetch: {
        credentials: "include",
      }
    });
    return response.data;
  },

  deleteDay: async (id: string) => {
    const response = await apiClient.sessions.day.delete({
      params: {
        id,
      },
    },{
      fetch: {
        credentials: "include",
      }
    });
    return response.data;
  },
};
