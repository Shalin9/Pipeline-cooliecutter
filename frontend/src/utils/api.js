import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5001/api",
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    console.log(`➡️ [${config.method?.toUpperCase()}] ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("❌ API Error:", error.response.status, error.response.data);
    } else {
      console.error("⚠️ Network or server error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
