import { cloudinary } from "../config/cloudinary";
import fs from "fs";

export const uploadImage = async (
  filePath: string,
  folder: string = "products",
): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: "image",
      transformation: [
        { width: 800, height: 800, crop: "limit" },
        { quality: "auto" },
      ],
    });

    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw error;
  }
};

export const uploadMultipleImages = async (
  filePaths: string[],
  folder: string | "products",
): Promise<string[]> => {
  const uploadImages = filePaths.map((filePath) =>
    uploadImage(filePath, folder),
  );

  return Promise.all(uploadImages);
};
