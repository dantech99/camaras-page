import { apiClient } from "@/utils/api-connection";

interface CreateCouponDto {
  code: string;
  discountPercentage: number;
  expirationDate: Date;
}

export const CouponService = {
  create: async (values: CreateCouponDto) => {
    const response = await apiClient.coupon.index.post(values, {
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.coupon.index.get({
      fetch: {
        credentials: "include",
      },
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient
      .coupon({
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
