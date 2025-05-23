import { prisma } from "@camaras/api/src/modules/prisma";

export class CouponService {

  async validateCoupon(code: string, photographerId: string) {    
    try {
      const coupon = await prisma.discount.findUnique({
        where: {
          code,
          photographerId,
        },
      });

      if (!coupon) {
        throw new Error("Coupon not found");
      }

      if (coupon.expirationDate < new Date()) {
        throw new Error("Coupon expired");
      }

      if (!coupon.isActive) {
        throw new Error("Coupon is already used");
      }

      return {
        message: "Coupon validated successfully",
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

  async createCoupon(
    id: string,
    body: {
      code: string;
      discountPercentage: number;
      expirationDate: Date;
    }
  ) {
    try {
      const { code, discountPercentage, expirationDate } = body;

      const photographer = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!photographer) {
        throw new Error("Photographer not found");
      }

      const cuponNameAlreadyExists = await prisma.discount.findFirst({
        where: {
          code,
        },
      });

      if (
        cuponNameAlreadyExists &&
        !cuponNameAlreadyExists.isActive &&
        cuponNameAlreadyExists.photographerId === photographer.id
      ) {
        await prisma.discount.update({
          where: {
            id: cuponNameAlreadyExists.id,
          },
          data: {
            discountPercentage,
            isActive: true,
            expirationDate,
          },
        });

        return {
          message: "Cupon updated successfully",
          status: 200,
          coupon: cuponNameAlreadyExists,
        };
      }

      if (cuponNameAlreadyExists && cuponNameAlreadyExists.isActive) {
        throw new Error("Cupon name already exists");
      }

      const coupon = await prisma.discount.create({
        data: {
          code,
          discountPercentage,
          expirationDate,
          photographerId: photographer.id,
        },
      });

      return {
        message: "Cupon created successfully",
        status: 201,
        coupon,
      };
    } catch (error) {
      console.log({ error });

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
      const photographer = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!photographer) {
        throw new Error("Photographer not found");
      }

      const coupons = await prisma.discount.findMany({
        where: {
          photographerId: photographer.id,
          isActive: true,
        },
        select: {
          id: true,
          discountPercentage: true,
          code: true,
          expirationDate: true,
          createdat: true,
          isActive: true,
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
      const photographer = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!photographer) {
        throw new Error("Photographer not found");
      }

      const { code, discountPercentage, expirationDate, isActive } = data;

      const coupon = await prisma.discount.update({
        where: {
          id,
          photographerId: photographer.id,
        },
        data: {
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
      const photographer = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!photographer) {
        throw new Error("Photographer not found");
      }

      await prisma.discount.delete({
        where: {
          id,
          photographerId: photographer.id,
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
