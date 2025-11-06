// src/pages/PaymentsPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PaymentsPage() {
  const [recipientName, setRecipientName] = useState("");
  const [recipientAccount, setRecipientAccount] = useState("");
  const [bank, setBank] = useState("");
  const [country, setCountry] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [message, setMessage] = useState("");
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Redirect if not logged in
  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  // Fetch user's payments
  const fetchPayments = async () => {
    try {
      const res = await axios.get("https://localhost:4430/api/payments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(res.data);
    } catch (err) {
      console.error("Error fetching payments:", err.response || err);
      setMessage("Failed to fetch payments.");
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!recipientName || !recipientAccount || !bank || !country || !amount || !currency) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post(
        "https://localhost:4430/api/payments",
        { recipientName, recipientAccount, bank, country, amount, currency },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Payment created successfully!");
      setRecipientName("");
      setRecipientAccount("");
      setBank("");
      setCountry("");
      setAmount("");
      setCurrency("USD");
      fetchPayments();
    } catch (err) {
      console.error("Error creating payment:", err.response || err);
      setMessage(
        err.response?.data?.errors?.[0]?.msg || err.response?.data?.error || "Error creating payment"
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(-45deg, #6a11cb, #2575fc, #ff416c, #ff4b2b)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
        padding: 20,
      }}
    >
      {/* Top bar */}
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          color: "#fff",
        }}
      >
        <h2>Welcome, {user?.username}</h2>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            background: "#e74c3c",
            border: "none",
            borderRadius: 5,
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Payment Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          margin: "15px 0",
          width: 350,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <h3 style={{ textAlign: "center" }}>Create Payment</h3>
        <input
          type="text"
          placeholder="Recipient Name"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Recipient Account"
          value={recipientAccount}
          onChange={(e) => setRecipientAccount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Bank"
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select value={currency} onChange={(e) => setCurrency(e.target.value)} required>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="ZAR">ZAR</option>
        </select>
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
          Create Payment
        </button>
      </form>

      {/* Message */}
      {message && (
        <p
          style={{
            background: "#fff",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
            width: 350,
            textAlign: "center",
          }}
        >
          {message}
        </p>
      )}

      {/* Payments List */}
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          marginTop: 20,
          width: 350,
        }}
      >
        <h3>Your Payments</h3>
        {payments.length === 0 && <p>No payments yet.</p>}
        {payments.map((p) => (
          <div
            key={p._id}
            style={{
              borderBottom: "1px solid #ccc",
              padding: "5px 0",
            }}
          >
            <p>
              <strong>{p.recipientName}</strong> - {p.amount} {p.currency} -{" "}
              {p.status}
            </p>
          </div>
        ))}
      </div>

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

Meta Platforms Inc. (2024) *React Documentation: Components, Hooks, and State Management.* Available at: https://react.dev/

React Router (2024) *React Router Documentation.* Available at: https://reactrouter.com/en/main

Axios (2024) *Axios - Promise-based HTTP client for the browser and Node.js.* Available at: https://axios-http.com/docs/intro

Mozilla Developer Network (2024) *Web Storage API - localStorage and sessionStorage.* Available at: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API

CSS Tricks (2024) *CSS Gradients and Animations Guide.* Available at: https://css-tricks.com/
*/
