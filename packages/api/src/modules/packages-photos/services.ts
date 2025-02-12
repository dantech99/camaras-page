import { PrismaClient } from "@camaras/database";

const prisma = new PrismaClient();

class PackageService {
  async findMany() {
    return prisma.photoPackage.findMany({ where: { isActive: true } });
  }

  async findOne( id: string ) {
    return prisma.photoPackage.findUnique({
      where: {
        id,
        isActive: true,      
      },
    });
  }

  async findManyByUser( photographerId: string ) {
    return prisma.photoPackage.findMany({
      where: {
        photographerId,
        isActive: true,
      },
    });
  }

  async create( data: { photographerId: string, name: string, description?: string, price: number, photoCount: number, userId: string } ) {
    return prisma.photoPackage.create({
      data,
    });
  }

  async update( id: string, data: { name: string, description?: string, price: number, photoCount: number } ) {
    return prisma.photoPackage.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete( id: string ) {
    return prisma.photoPackage.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      }
    });
  }


}