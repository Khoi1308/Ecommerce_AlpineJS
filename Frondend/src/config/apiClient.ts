import axios from "axios";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};
export const API = axios.create(options);
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // const { status, data } = error.response;
    // return Promise.reject({ status, ...data });
    console.error("API error: ", error);

    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      const errorMessage = data?.message || data?.error || `HTTP ${status}`;
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      // Network error - không thể kết nối tới server
      return Promise.reject(
        new Error("Network error - Cannot connect to server"),
      );
    } else {
      // Other error
      return Promise.reject(new Error(error.message));
    }
  },
);
