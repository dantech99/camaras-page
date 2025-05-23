import { apiClient } from "@/utils/api-connection";

interface CreateCouponDto {
  code: string;
  discountPercentage: number;
  expirationDate: Date;
}

interface UpdateCouponDto {
  code: string;
  discountPercentage: number;
  expirationDate: Date;
  isActive: boolean;
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

  validate: async (code: string, photographerId: string) => {
    const response = await apiClient.coupon.validate.post(
      { code, photographerId },
      {
        fetch: {
          credentials: "include",
        },
      }
    );
    return response.data;
  },
  

  update: async (id: string, values: UpdateCouponDto) => {
    const response = await apiClient
      .coupon({
        id,
      })
      .patch(
        {
          code: values.code,
          discountPercentage: values.discountPercentage,
          expirationDate: values.expirationDate,
          isActive: values.isActive,
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
