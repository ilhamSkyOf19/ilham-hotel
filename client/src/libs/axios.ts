import axios from "axios";
import { redirect } from "react-router";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_LOCAL_URL_SERVER,
  timeout: 10000,
  withCredentials: true,
});

// Interceptors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      return redirect("/login");
    }
    return Promise.reject(error);
  }
);

// Export
export default api;
