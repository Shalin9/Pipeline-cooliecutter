// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:4430/api", // your backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // optional if you handle cookies
});

export default api;
