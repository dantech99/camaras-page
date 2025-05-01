import { supabaseS3 } from "@camaras/s3/index";
import sharp from "sharp";

type ImageFolder = "package" | "photographer";

const MAX_SIZE_KB = 200;
const MAX_SIZE_BYTES = MAX_SIZE_KB * 1024;

class ImageServiceError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = "ImageServiceError";
  }
}

export class ImageService {
  async createImage(image: File, photographerId: string, folder: ImageFolder) {
    try {
      if (!image) {
        throw new ImageServiceError("Image file is required");
      }
      if (!photographerId) {
        throw new ImageServiceError("Photographer ID is required");
      }

      const fileName = `${photographerId}-${Date.now()}.webp`;
      const filePath = `${folder}/${fileName}`;

      try {
        const compressedBuffer = await this.compressToWebp(image);
        const uint8Array = new Uint8Array(compressedBuffer);

        const writeResult = await supabaseS3.write(filePath, uint8Array);
        if (!writeResult) {
          throw new ImageServiceError("Failed to upload image to storage");
        }

        if (!process.env.SUPABASE_URL_BUCKET) {
          throw new ImageServiceError("Storage bucket URL is not configured");
        }

        const imageUrl = `${process.env.SUPABASE_URL_BUCKET}/${filePath}`;
        return imageUrl;
      } catch (error) {
        if (error instanceof Error) {
          throw new ImageServiceError(
            "Failed to process or upload image",
            error
          );
        }
        throw error;
      }
    } catch (error) {
      if (error instanceof ImageServiceError) {
        throw error;
      }
      throw new ImageServiceError(
        "Unexpected error while creating image",
        error
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
        ""
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
    const inputBuffer = Buffer.from(await file.arrayBuffer());

    let quality = 100;
    let outputBuffer: Buffer = await sharp(inputBuffer)
      .webp({ quality })
      .toBuffer();

    while (outputBuffer.length > MAX_SIZE_BYTES && quality > 10) {
      quality -= 5;
      outputBuffer = await sharp(inputBuffer).webp({ quality }).toBuffer();
    }

    if (outputBuffer.length > MAX_SIZE_BYTES) {
      outputBuffer = await sharp(inputBuffer)
        .resize({ width: 1024 })
        .webp({ quality })
        .toBuffer();
    }

    return outputBuffer;
  }
}
