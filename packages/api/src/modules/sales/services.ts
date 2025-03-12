import { PrismaClient } from "@camaras/database/index";

const prisma = new PrismaClient();

export class Sales {

    async findMany() {
        return prisma.sale.findMany();
    }

    async findManyByUser( userId: string ) {
        return prisma.sale.findMany({
            where: { buyerId: userId },
        });
    }

    async create( data: { userId: string, packageId: string, quantity: number, total: number } ) {
        return prisma.sale.create({
            data: { amount: data.quantity, buyerId: data.userId, packageId: data.packageId },
        });
    }

    async delete( id: string ) {
        return prisma.sale.delete({
            where: { id },
        });
    }


    async update( id: string, data: { quantity: number, total: number } ) {
        return prisma.sale.update({
            where: { id },
            data: { amount: data.quantity },
        });
    }

    async findOne( id: string ) {
        return prisma.sale.findUnique({
            where: { id },
        });
    }

    async findManyByPackage( packageId: string ) {
        return prisma.sale.findMany({
            where: { packageId },
        });
    }
}