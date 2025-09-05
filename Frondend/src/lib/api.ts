import { API } from "../config/apiClient";
import { CLOUDINARY_CONFIG } from "../config/cloudinary";

// Types for Category API
interface Category {
  categoryId: string;
  category_name: string;
  category_description?: string | null;
  createdAt: string;
}

type LoginParams = {
  email: string;
  username?: string;
  password: string;
};

type RegisterParams = {
  email: string;
  username?: string;
  password: string;
  confirmPassword: string;
};

type ResetPasswordParams = {
  verificationCode: string;
  password: string;
  confirmPassword: string;
};

export const login = async (data: LoginParams) => API.post("/auth/login", data);

export const register = async (data: RegisterParams) =>
  API.post("/auth/register", data);

export const logout = async () => {
  try {
    await API.get("/auth/logout");
  } catch (error) {
    console.error("Log out failed: ", error);
  }
};

export const verifyEmail = async (verificationCode: string) =>
  API.get(`/auth/email/verify/${verificationCode}`);

export const sendResetPasswordEmail = async (email: string) =>
  API.post("/auth/password/forgot", { email });

export const resetPassword = async ({
  verificationCode,
  password,
  confirmPassword,
}: ResetPasswordParams) =>
  API.post("/auth/password/reset", {
    verificationCode,
    password,
    confirmPassword,
  });

export const getUser = async () => {
  const response = await API.get("/users");

  return response;
};

export const addImage = async (file: any): Promise<string> => {
  const formData = new FormData();
  console.log("Image file: ", file);

  formData.append("image", file);

  console.log("Add image: ", formData);
  return await API.post("/users/avatar/image", formData);
};

export const addMultipleImage = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();

  files.forEach((file: any) => {
    formData.append("images", file);
  });

  return await API.post("/products/add/images", formData);
};

export const uploadImagesToCloudinary = async (files: File[]) => {
  try {
    const uploadPromises = Array.from(files).map((file, index) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file as File);
        formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
        formData.append("folder", "banners");

        fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.error) {
              reject(new Error(result.error.message));
            } else {
              resolve({
                url: result.secure_url,
                public_id: result.public_id,
                original_filename: file.name,
                size: result.bytes,
                format: result.format,
                order_index: index + 1,
              });
            }
          })
          .catch(reject);
      });
    });

    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error("Upload to Cloudinary Error:", error);
    throw error;
  }
};

export const addProduct = async (productData) => {
  return await API.post("/products", productData);
};

export const fetchAllCategories = async () => {
  try {
    const response = await API.get("/categories");

    return response.data;
  } catch (error) {
    console.error("Fetch Categories Error:", error); // Log the error object
  }
};

// Banner
export const addBanner = async (imageUrls: string[]) => {
  return await API.post("/banners", { images: imageUrls });
};

export const getAllBanners = async () => {
  const response = await API.get("/banners");
  return response;
};
