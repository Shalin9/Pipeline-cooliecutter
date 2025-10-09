import { useEffect, useState } from "react";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUsername = localStorage.getItem("username");
    const savedEmail = localStorage.getItem("email");

    if (savedToken && savedUsername && savedEmail) {
      setToken(savedToken);
      setUsername(savedUsername);
      setEmail(savedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const copyToken = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      background: "linear-gradient(-45deg, #6a11cb, #2575fc, #ff416c, #ff4b2b)",
      backgroundSize: "400% 400%",
      animation: "gradientBG 15s ease infinite",
      padding: 20
    }}>
      <h1 style={{ color: "#fff", marginBottom: 30 }}>Welcome, {username}!</h1>

      <div style={{ background: "#fff", padding: 20, borderRadius: 12, margin: "15px 0", width: 350, textAlign: "center" }}>
        <h3>User Info</h3>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>

      <div style={{ background: "#fff", padding: 20, borderRadius: 12, margin: "15px 0", width: 350, textAlign: "center" }}>
        <h3>Your Token</h3>
        <code style={{ wordBreak: "break-all", display: "block", padding: 10, background: "#ecf0f1", borderRadius: 5, marginBottom: 10 }}>
          {token || "No token available"}
        </code>
        <button onClick={copyToken} style={{ padding: 8, cursor: "pointer", background: "#3498db", color: "#fff", border: "none", borderRadius: 5 }}>
          {copied ? "Copied!" : "Copy Token"}
        </button>
      </div>

      <button onClick={handleLogout} style={{ padding: 10, background: "#e74c3c", color: "#fff", border: "none", borderRadius: 8, marginTop: 20 }}>
        Logout
      </button>

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
