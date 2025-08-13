import { API } from "../config/apiClient";

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

export const addImage = async (file): Promise<string> => {
  const formData = new FormData();
  console.log("Image file: ", file);

  formData.append("image", file);

  console.log("Add image: ", formData);
  return await API.post("/users/avatar/image", formData);
};

export const addMultipleImage = async (files): Promise<string[]> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  return await API.post("/products/add/images", formData);
};

export const addProduct = async (productData) => {
  return await API.post("/products", productData);
};

export const fetchAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await API.get("/categories");

    return response.data;
  } catch (error) {
    console.error("Fetch Categories Error:", error); // Log the error object
  }
};
