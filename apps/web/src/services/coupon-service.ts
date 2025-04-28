import { apiClient } from "@/utils/api-connection";

interface CreateCouponDto {
  code: string;
  discountPercentage: number;
  expirationDate?: Date;
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
};
