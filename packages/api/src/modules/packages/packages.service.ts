import { prisma } from "@camaras/api/src/modules/prisma";
import { supabaseS3 } from "@camaras/api/src/core/s3";

export class PackagesService {
  async createPackage(
    data: {
      name: string;
      description: string;
      price: number;
      photoCount: number;
      image: File | null;
      descriptionBullets: { content: string }[];
    },
    user: { id: string }
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

      console.log(data)
      
      if (price <= 0) {
        throw new Error("Debe poner un precio valido");
      }

      if (photoCount <= 0) {
        throw new Error("Debe poner una cantidad valida");
      }

      if (image == null) {
        throw new Error("No hay una foto valida");
      }

      if (!descriptionBullets || descriptionBullets.length === 0) {
        throw new Error("Debe agregar al menos un bullet de descripción");
      }

      const fileExtension = image.name.split(".").pop();
      const fileName = `${name.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.${fileExtension}`;
      const filePath = `package/${fileName}`;

      const buffer = await image.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);

      const writeResult = await supabaseS3.write(filePath, uint8Array);

      if (!writeResult) {
        throw new Error("Error uploading image to S3");
      }

      const imageUrl = `${process.env.SUPABASE_URL_BUCKET}/${filePath}`;

      const photoPackage = await prisma.photoPackage.create({
        data: {
          name,
          description,
          price,
          photoCount,
          photographerId: user.id,
          isActive: true,
          discountPercentage: 0,
          imageUrl: imageUrl,
          descriptionBullets: {
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
      const packages = await prisma.photoPackage.findMany({
        where: {
          photographerId,
        },
        include: {
          descriptionBullets: true,
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
      isActive?: boolean;
      discountPercentage?: number;
      image?: File;
      descriptionBullets?: { content: string }[];
    },
    userId: string
  ) {
    try {
      const {
        name,
        description,
        price,
        photoCount,
        isActive,
        discountPercentage,
        image,
        descriptionBullets,
      } = data;

      let imageUrl: string | undefined;

      if (image) {
        const fileExtension = image.name.split(".").pop();
        const fileName = `${name.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.${fileExtension}`;
        const filePath = `package/${fileName}`;

        const buffer = await image.arrayBuffer();
        const uint8Array = new Uint8Array(buffer);

        const writeResult = await supabaseS3.write(filePath, uint8Array);

        if (!writeResult) {
          throw new Error("Error uploading image to S3");
        }

        imageUrl = `${process.env.SUPABASE_URL_BUCKET}/${filePath}`;
      }

      const photoPackage = await prisma.photoPackage.update({
        where: {
          id,
          photographerId: userId,
        },
        data: {
          name,
          description,
          price,
          photoCount,
          isActive,
          discountPercentage,
          ...(imageUrl && { imageUrl }),
          ...(descriptionBullets && {
            descriptionBullets: {
              deleteMany: {},
              create: descriptionBullets,
            },
          }),
        },
        include: {
          descriptionBullets: true,
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
      await prisma.photoPackage.delete({
        where: {
          id,
          photographerId: userId,
        },
      });

      return {
        message: "Package deleted successfully",
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
