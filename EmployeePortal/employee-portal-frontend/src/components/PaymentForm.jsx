import React, { useState } from "react";
import api from "../api/api";

const PaymentForm = ({ onPaymentCreated }) => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validName = /^[a-zA-Z\s]+$/.test(recipient);
    if (!validName) return setError("Recipient name must contain only letters");

    try {
      await api.post("/payments", { amount, recipient, currency });
      setAmount("");
      setRecipient("");
      setError("");
      onPaymentCreated();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create payment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md w-80">
      <h3 className="text-lg font-semibold mb-3">Create New Payment</h3>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <input type="text" placeholder="Recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} className="border p-2 w-full mb-2 rounded" required />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2 w-full mb-2 rounded" required />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="border p-2 w-full mb-2 rounded">
        <option>USD</option>
        <option>EUR</option>
        <option>GBP</option>
        <option>ZAR</option>
      </select>
      <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded w-full">Send Payment</button>
    </form>
  );
};

export default PaymentForm;
