import { PrismaClient } from "@camaras/database/index";

const Prisma = new PrismaClient();

class OrdersService {
  async getAllOrders() {
    return await Prisma.sale.findMany({});
  }

  async getOrderById(id: string) {
    return await Prisma.sale.findUnique({
      where: { id },
    });
  }

  async createOrder(data: any) {
    return await Prisma.sale.create({
      data,
    });
  }

  async updateOrder(id: string, data: any) {
    return await Prisma.sale.update({
      where: { id },
      data,
    });
  }

  async deleteOrder(id: string) {
    return await Prisma.sale.delete({
      where: { id },
    });
  }
}

export const ordersService = new OrdersService();