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
      isActive: string;
      image: File;
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
        image,
        descriptionBullets,
      } = data;

      let isActiveFromFrontend: string = data.isActive;
      let isActive: boolean;

      const photographer = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!photographer) {
        throw new Error("Photographer not found");
      }

      if (isActiveFromFrontend == "true") {
        isActive = true;
      } else {
        isActive = false;
      }

      const existingPackage = await prisma.package.findUnique({
        where: {
          id,
          photographerName: photographer.name,
        },
        include: {
          features: true,
        },
      });

      if (!existingPackage) {
        throw new Error("Package not found");
      }

      let imageUrl: string | undefined = existingPackage.imageUrl;

      if (image) {
        if (existingPackage.imageUrl) {
          const oldImagePath = existingPackage.imageUrl.replace(
            `${process.env.SUPABASE_URL_BUCKET}/`,
            ""
          );
          await supabaseS3.delete(oldImagePath);
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

        imageUrl = `${process.env.SUPABASE_URL_BUCKET}/${filePath}`;
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
          ...(descriptionBullets && {
            features: {
              deleteMany: {},
              create: descriptionBullets,
            },
          }),
          ...(!descriptionBullets && {
            features: {
              deleteMany: {},
            },
          }),
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
      console.log(error);
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
