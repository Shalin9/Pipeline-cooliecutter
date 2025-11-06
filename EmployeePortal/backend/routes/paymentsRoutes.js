// routes/paymentsRoutes.js
import express from "express";
import Payment from "../models/Payment.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// Get payments for logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    console.error("GET /payments error:", err);
    res.status(500).json({ error: "Server error fetching payments" });
  }
});

// Create a new payment
router.post("/", verifyToken, async (req, res) => {
  const { amount, recipient, currency } = req.body;

  if (!amount || !recipient || !currency)
    return res.status(400).json({ error: "Missing fields: amount, recipient, currency" });

  try {
    const newPayment = new Payment({
      userId: req.userId,
      amount,
      recipient,
      currency: currency.toUpperCase(),
    });

    await newPayment.save();
    res.status(201).json({ message: "Payment created", payment: newPayment });
  } catch (err) {
    console.error("POST /payments error:", err);
    res.status(500).json({ error: "Server error creating payment" });
  }
});

export default router;
