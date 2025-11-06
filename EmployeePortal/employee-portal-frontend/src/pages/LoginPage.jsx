// src/pages/LoginPage.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/payments");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    try {
      const res = await axios.post("https://localhost:4430/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/payments");
    } catch (err) {
      console.error("Login error:", err.response || err);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUsername("");
    setPassword("");
    navigate("/");
  };

  const token = localStorage.getItem("token");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "linear-gradient(-45deg, #6a11cb, #2575fc, #ff416c, #ff4b2b)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
        padding: 20,
      }}
    >
      <h1 style={{ color: "#fff", marginBottom: 30 }}>Employee Portal</h1>

      {!token ? (
        <form
          onSubmit={handleLogin}
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            width: 350,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <p style={{ color: "red", textAlign: "center", fontSize: 14 }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            style={{
              padding: 10,
              background: "#3498db",
              color: "#fff",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      ) : (
        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            width: 350,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignItems: "center",
          }}
        >
          <p style={{ textAlign: "center" }}>
            You are logged in as <strong>{JSON.parse(localStorage.getItem("user")).username}</strong>
          </p>
          <button
            onClick={handleLogout}
            style={{
              padding: 10,
              background: "#e74c3c",
              color: "#fff",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              width: "100%",
            }}
          >
            Logout
          </button>
        </div>
      )}

      <style>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

/*
References (Harvard Style):

Meta Platforms Inc. (2024) *React Documentation: Components, State, and Lifecycle.* Available at: https://react.dev/

Axios (2024) *Axios - Promise-based HTTP client for the browser and Node.js.* Available at: https://axios-http.com/docs/intro

React Router (2024) *React Router Documentation.* Available at: https://reactrouter.com/en/main

Mozilla Developer Network (2024) *Web Storage API - localStorage and sessionStorage.* Available at: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
*/
