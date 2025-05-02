import { prisma } from "@camaras/api/src/modules/prisma";
import { supabaseS3 } from "@camaras/s3/index";
import { ImageService } from "@camaras/api/src/modules/images/images.service";

export class PackagesService {
  private imageService: ImageService;

  constructor() {
    this.imageService = new ImageService();
  }

  async createPackage(
    data: {
      name: string;
      description: string;
      price: number;
      photoCount: number;
      image: File;
      descriptionBullets: { content: string }[];
    },
    userId: string
  ) {
    try {
      const {
        name,
        description,
        price,
        photoCount,
        image,
        descriptionBullets,
      } = data;

      const photographer = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!photographer) {
        throw new Error("Photographer not found");
      }

      if (price <= 0) {
        throw new Error("Debe poner un precio valido");
      }

      if (photoCount <= 0) {
        throw new Error("Debe poner una cantidad valida");
      }

      const imageUrl = await this.imageService.createImage(
        image,
        photographer.id,
        "package"
      );

      const photoPackage = await prisma.package.create({
        data: {
          name,
          description,
          price,
          photoCount,
          photographerName: photographer.name,
          isActive: true,
          discountPercentage: 0,
          imageUrl: imageUrl,
          features: {
            create: descriptionBullets,
          },
        },
      });

      return {
        message: "Package created successfully",
        status: 201,
        photoPackage,
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

  async getPackagesFromPhotographer(photographerId: string) {
    try {
      const photographer = await prisma.user.findUnique({
        where: {
          id: photographerId,
        },
      });

      if (!photographer) {
        throw new Error("Photographer not found");
      }

      const packages = await prisma.package.findMany({
        where: {
          photographerName: photographer.name,
          deletedAt: null,
        },
        include: {
          features: true,
        },
      });

      const formattedPackages = packages.map((pkg) => ({
        ...pkg,
        price: Number(pkg.price),
        discountPercentage: Number(pkg.discountPercentage),
      }));

      return {
        message: "Packages retrieved successfully",
        status: 200,
        packages: formattedPackages,
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

  async updatePackage(
    id: string,
    data: {
      name: string;
      description: string;
      price: number;
      photoCount: number;
      image?: File;
      descriptionBullets: { content: string }[];
      isActive: boolean;
    },
    userId: string
  ) {
    try {
      const {
        name,
        description,
        price,
        photoCount,
        image,
        descriptionBullets,
        isActive,
      } = data;

      const photographer = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!photographer) {
        throw new Error("Photographer not found");
      }

      const existingPackage = await prisma.package.findUnique({
        where: {
          id,
          photographerName: photographer.name,
        },
        include: { features: true },
      });

      if (!existingPackage) {
        throw new Error("Package not found");
      }

      let imageUrl = existingPackage.imageUrl;

      if (image) {
        await this.imageService.deleteImage(existingPackage.imageUrl);
        imageUrl = await this.imageService.createImage(
          image,
          photographer.id,
          "package"
        );
      }

      const photoPackage = await prisma.package.update({
        where: {
          id,
          photographerName: photographer.name,
        },
        data: {
          name,
          description,
          price,
          photoCount,
          isActive,
          imageUrl,
          features: {
            deleteMany: {},
            create: descriptionBullets,
          },
        },
        include: {
          features: true,
        },
      });

      return {
        message: "Package updated successfully",
        status: 200,
        photoPackage,
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

  async deletePackage(id: string, userId: string) {
    try {
      const photographer = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!photographer) {
        throw new Error("Photographer not found");
      }

      const existingPackage = await prisma.package.findUnique({
        where: {
          id,
          photographerName: photographer.name,
        },
      });

      if (!existingPackage) {
        throw new Error("Package not found");
      }

      if (existingPackage.imageUrl) {
        const imagePath = existingPackage.imageUrl.replace(
          `${process.env.SUPABASE_URL_BUCKET}/`,
          ""
        );
        await supabaseS3.delete(imagePath);
      }

      await prisma.package.update({
        where: {
          id,
          photographerName: photographer.name,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return {
        message: "Package and its features deleted successfully",
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
