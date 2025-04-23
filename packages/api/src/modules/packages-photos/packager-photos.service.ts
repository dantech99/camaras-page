import { prisma } from "../prisma";

export class PackageService {
  async createPackage(data: { name: string, description: string, price: number, photos: string[] }, user: { id: string }) {
    const { name, description, price, photos } = data

    const photoPackage = await prisma.photoPackage.create({
      data: {
        name,
        description,
        price,
        photoCount: photos.length,
        photographerId: user.id,
        isActive: true,
        discountPercentage: 0,
      }
    })

    return {
      message: "Package created successfully",
      status: 201,
      photoPackage,
    }
  }
}