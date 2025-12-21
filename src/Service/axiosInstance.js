import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://world.openfoodfacts.org",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Global response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
