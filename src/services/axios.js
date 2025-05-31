import axios from "axios";

console.log("API_BASE_URL", process.env.REACT_APP_API_BASE_URL);
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
      // localStorage.removeItem("token");
        // window.location.href = "/";
      } else if (status === 500) {
        console.error("Server error.");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
