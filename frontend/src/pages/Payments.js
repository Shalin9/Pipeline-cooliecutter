// src/pages/Payments.js
import { useState, useEffect } from "react";
import api from "../utils/api";

export default function Payments() {
  const [recipientName, setRecipientName] = useState("");
  const [recipientAccount, setRecipientAccount] = useState("");
  const [bank, setBank] = useState("");
  const [country, setCountry] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [message, setMessage] = useState("");
  const [payments, setPayments] = useState([]);

  // Load user's payments
  const fetchPayments = async () => {
    try {
      const res = await api.get("/payments", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPayments(res.data);
    } catch (err) {
      console.error("Error fetching payments:", err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.post(
        "/payments",
        { recipientName, recipientAccount, bank, country, amount, currency },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
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
        err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || "Error creating payment"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background:
          "linear-gradient(-45deg, #6a11cb, #2575fc, #ff416c, #ff4b2b)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
        padding: 20,
      }}
    >
      <h1 style={{ color: "#fff", marginBottom: 30 }}>Payments Portal</h1>

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
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          required
        >
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
