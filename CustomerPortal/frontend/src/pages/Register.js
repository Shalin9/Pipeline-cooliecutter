import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/users/register", form);
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error registering");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(-45deg, #6a11cb, #2575fc, #ff416c, #ff4b2b)",
      backgroundSize: "400% 400%",
      animation: "gradientBG 15s ease infinite",
      padding: 20
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "#fff",
        padding: 30,
        borderRadius: 15,
        boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
        width: 350,
        textAlign: "center"
      }}>
        <h2>Register</h2>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} style={{ width: "100%", padding: 10, margin: 5 }} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} style={{ width: "100%", padding: 10, margin: 5 }} />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} style={{ width: "100%", padding: 10, margin: 5 }} />
        <button type="submit" style={{ padding: 10, width: "100%", marginTop: 10 }}>Register</button>
        <p>{message}</p>
        <p>
          Already have an account? <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}>Login</button>
        </p>
      </form>
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
