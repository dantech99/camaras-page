import { prisma } from "@camaras/api/src/modules/prisma";

export class CouponService {
  async createCoupon(
    id: string,
    body: {
      code: string;
      discountPercentage: number;
      expirationDate?: Date;
    }
  ) {
    try {
      const { code, discountPercentage, expirationDate } = body;

      const coupon = await prisma.discountCode.create({
        data: {
          code,
          discountPercentage,
          expirationDate: expirationDate ? expirationDate : null,
          photographerId: id,
        },
      });

      return {
        message: "Cupon created successfully",
        status: 201,
        coupon,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          message: error.message,
          status: 500,
        };
      }

      return {
        message: "An unknown error occurred",
        status: 500,
      };
    }
  }

  async getCoupons(id: string) {
    try {
      const coupons = await prisma.discountCode.findMany({
        where: {
          photographerId: id,
        },
      });

      return {
        message: "Coupons retrived successfully",
        status: 200,
        coupons,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          mesaage: error.message,
          status: 500,
        };
      }

      return {
        message: "An unknown error occurred",
        status: 500,
      };
    }
  }

  async updateCoupon(
    id: string,
    data: {
      code: string;
      discountPercentage: number;
      expirationDate?: Date;
      isActive: boolean;
    },
    userId: string
  ) {
    try {
      const { code, discountPercentage, expirationDate, isActive } = data;

      const coupon = await prisma.discountCode.update({
        where: {
          id,
          photographerId: userId,
        },
        data: {
          photographerId: userId,
          code,
          discountPercentage,
          expirationDate,
          isActive,
        },
      });

      return {
        message: "Coupon updated successfully",
        status: 200,
        coupon,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          message: error.message,
          status: 500,
        };
      }

      return {
        message: "An unknown error occurred",
        status: 500,
      };
    }
  }

  async deleteCoupon(id: string, userId: string) {
    try {
      await prisma.discountCode.delete({
        where: {
          id,
          photographerId: userId,
        },
      });

      return {
        message: "Coupon deleted successfully",
        status: 200,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          message: error.message,
          status: 500,
        };
      }

      return {
        message: "An unknown error occurred",
        status: 500,
      };
    }
  }
}
