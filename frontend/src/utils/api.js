// src/utils/api.js
import axios from "axios";

// Axios instance to talk to backend
const api = axios.create({
  baseURL: "http://localhost:5001/api", // backend URL
  withCredentials: true,                // allow JWT in headers/cookies
});

// Optional: intercept responses to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
