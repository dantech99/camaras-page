import { supabaseS3 } from "@camaras/s3/index";
import sharp from "sharp";

type ImageFolder = "package" | "photographer";

const MAX_SIZE_KB = 200;
const MAX_SIZE_BYTES = MAX_SIZE_KB * 1024;

class ImageServiceError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = "ImageServiceError";
  }
}

export class ImageService {
  async createImage(image: File, photographerId: string, folder: ImageFolder) {
    try {
      if (!image) {
        console.error("Image file is required");
        throw new ImageServiceError("Image file is required");
      }
      if (!photographerId) {
        console.error("Photographer ID is required");
        throw new ImageServiceError("Photographer ID is required");
      }

      console.log("Processing image:", {
        name: image.name,
        type: image.type,
        size: image.size,
        photographerId,
        folder,
      });

      const fileName = `${photographerId}-${Date.now()}.webp`;
      const filePath = `${folder}/${fileName}`;

      try {
        console.log("Starting image compression...");
        const compressedBuffer = await this.compressToWebp(image);
        console.log(
          "Compression successful, buffer size:",
          compressedBuffer.length,
        );

        const uint8Array = new Uint8Array(compressedBuffer);

        console.log("Uploading to S3...");
        const writeResult = await supabaseS3.write(filePath, uint8Array);
        if (!writeResult) {
          console.error("Failed to upload image to storage");
          throw new ImageServiceError("Failed to upload image to storage");
        }
        console.log("Upload successful");

        if (!process.env.SUPABASE_URL_BUCKET) {
          console.error("Storage bucket URL is not configured");
          throw new ImageServiceError("Storage bucket URL is not configured");
        }

        const imageUrl = `${process.env.SUPABASE_URL_BUCKET}/${filePath}`;
        console.log("Image URL:", imageUrl);
        return imageUrl;
      } catch (error) {
        console.error("Error processing/uploading image:", error);
        if (error instanceof Error) {
          console.error("Error details:", {
            name: error.name,
            message: error.message,
            stack: error.stack,
          });
          throw new ImageServiceError(
            `Failed to process or upload image: ${error.message}`,
            error,
          );
        }
        throw error;
      }
    } catch (error) {
      if (error instanceof ImageServiceError) {
        throw error;
      }
      console.error("Unexpected error:", error);
      throw new ImageServiceError(
        "Unexpected error while creating image",
        error,
      );
    }
  }

  async deleteImage(imageUrl: string): Promise<boolean> {
    try {
      if (!imageUrl) {
        throw new ImageServiceError("Image URL is required");
      }

      if (!process.env.SUPABASE_URL_BUCKET) {
        throw new ImageServiceError("Storage bucket URL is not configured");
      }

      const oldImagePath = imageUrl.replace(
        `${process.env.SUPABASE_URL_BUCKET}/`,
        "",
      );

      if (oldImagePath === imageUrl) {
        throw new ImageServiceError("Invalid image URL format");
      }

      await supabaseS3.delete(oldImagePath);
      return true;
    } catch (error) {
      if (error instanceof ImageServiceError) {
        throw error;
      }
      throw new ImageServiceError("Failed to delete image", error);
    }
  }

  private async compressToWebp(file: File): Promise<Buffer> {
    try {
      console.log("Converting file to buffer...");
      const arrayBuffer = await file.arrayBuffer();
      const inputBuffer = Buffer.from(arrayBuffer);
      console.log("Input buffer size:", inputBuffer.length);

      let quality = 100;
      console.log("Starting sharp compression with quality:", quality);
      let outputBuffer: Buffer = await sharp(inputBuffer)
        .webp({ quality })
        .toBuffer();
      console.log(
        "Initial compression done, size:",
        outputBuffer.length,
        "max:",
        MAX_SIZE_BYTES,
      );

      while (outputBuffer.length > MAX_SIZE_BYTES && quality > 10) {
        quality -= 5;
        console.log("Recompressing with quality:", quality);
        outputBuffer = await sharp(inputBuffer).webp({ quality }).toBuffer();
      }

      if (outputBuffer.length > MAX_SIZE_BYTES) {
        console.log("Still too large, resizing to width 1024");
        outputBuffer = await sharp(inputBuffer)
          .resize({ width: 1024 })
          .webp({ quality })
          .toBuffer();
        console.log("Final size after resize:", outputBuffer.length);
      }

      return outputBuffer;
    } catch (error) {
      console.error("Error in compressToWebp:", error);
      if (error instanceof Error) {
        console.error("Sharp error details:", {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
      }
      throw error;
    }
  }
}
