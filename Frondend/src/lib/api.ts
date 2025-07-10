import { API } from "../config/apiClient";

type LoginParams = {
  email: string;
  username?: string;
  password: string;
};

export const login = async (data: LoginParams) => API.post("/auth/login", data);
