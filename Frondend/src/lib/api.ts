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

export const login = async (data: LoginParams) => API.post("/auth/login", data);
export const register = async (data: RegisterParams) =>
  API.post("/auth/register", data);
export const verifyEmail = async (verificationCode: string) =>
  API.get(`/auth/email/verify/${verificationCode}`);
