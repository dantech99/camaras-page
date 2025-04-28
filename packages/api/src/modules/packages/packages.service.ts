import { prisma } from "@camaras/api/src/modules/prisma";
import { supabaseS3 } from "@camaras/api/src/core/s3";

export class PackagesService {
  async createPackage(
    data: {
      name: string;
      description: string;
      price: number;
      photosCount: number;
      dotsDescription: string[];
      image: File | null;
    },
    user: { id: string }
  ) {
    try {
      const { name, description, price, dotsDescription, photosCount, image } =
        data;

      const priceToNumber = parseFloat(price.toString());
      if (isNaN(priceToNumber)) {
        throw new Error("Invalid price");
      }
      if (priceToNumber <= 0) {
        throw new Error("Price must be greater than 0");
      }

      const photosCountToNumber = parseInt(photosCount.toString());
      if (isNaN(photosCountToNumber)) {
        throw new Error("Invalid photos count");
      }
      if (photosCountToNumber <= 0) {
        throw new Error("Photos count must be greater than 0");
      }

      if (image == null) {
        throw new Error("No hay una foto valida");
      }

      const fileExtension = image.name.split(".").pop();
      const fileName = `${name.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.${fileExtension}`;
      const filePath = `package/${fileName}`;

      // Convertir el File a ArrayBuffer y luego a Unit8Array
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
          price: priceToNumber,
          photoCount: photosCountToNumber,
          dotsDescription: dotsDescription,
          photographerId: user.id,
          isActive: true,
          discountPercentage: 0,
          imageUrl: imageUrl,
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
      photosCount: number;
      dotsDescription: string[];
      isActive?: boolean;
      discountPercentage?: number;
    },
    userId: string
  ) {
    try {
      const {
        name,
        description,
        price,
        dotsDescription,
        photosCount,
        isActive,
        discountPercentage,
      } = data;

      const photoPackage = await prisma.photoPackage.update({
        where: {
          id,
          photographerId: userId,
        },
        data: {
          photographerId: userId,
          name,
          description,
          price,
          photoCount: photosCount,
          dotsDescription: dotsDescription,
          isActive: isActive,
          discountPercentage: discountPercentage,
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
