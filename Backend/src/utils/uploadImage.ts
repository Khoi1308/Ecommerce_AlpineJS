import { cloudinary } from "../config/cloudinary";

export const uploadImage = async (filePath: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      transformation: [
        { width: 800, height: 800, crop: "limit" },
        { quality: "auto" },
      ],
    });

    return result.secure_url;
  } catch (error) {
    throw new Error(`Message ${error}`);
  }
};

export const uploadMultipleImages = async (
  filePaths: string[],
): Promise<string[]> => {
  try {
    const uploadImages = filePaths.map(async (filePath) => {
      const image = await cloudinary.uploader.upload(filePath, {
        resource_type: "image",
        transformation: [
          { width: 800, height: 800, crop: "limit" },
          { quality: "auto" },
        ],
      });

      return image.secure_url;
    });

    return await Promise.all(uploadImages);
  } catch (error) {
    throw new Error(`Message ${error}`);
  }
};
