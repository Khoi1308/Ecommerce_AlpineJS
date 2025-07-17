import { API } from "../config/apiClient";

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
