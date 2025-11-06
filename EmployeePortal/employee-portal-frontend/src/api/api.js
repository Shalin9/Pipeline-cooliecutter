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

/*
References (Harvard Style):

Axios (2024) *Axios - Promise-based HTTP client for the browser and Node.js.* Available at: https://axios-http.com/docs/intro

Node.js Foundation (2024) *Node.js v22.0.0 Documentation.* Available at: https://nodejs.org/en/docs/

Mozilla Developer Network (2024) *HTTP - Hypertext Transfer Protocol overview.* Available at: https://developer.mozilla.org/en-US/docs/Web/HTTP
*/
