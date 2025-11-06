// backend/routes/paymentsRoutes.js
import express from "express";
import Payment from "../models/Payment.js"; // make sure Payment model exists
import auth from "../middleware/auth.js";

const router = express.Router();

// Helper for validating input
function validatePaymentInput(data) {
  const errors = [];
  const regexName = /^[A-Za-z\s]{2,50}$/;
  const regexAccount = /^[0-9]{4,20}$/;
  const regexBank = /^[A-Za-z\s]{2,50}$/;
  const regexCountry = /^[A-Za-z\s]{2,50}$/;
  const regexCurrency = /^(USD|EUR|GBP|ZAR)$/;

  if (!data.recipientName || !regexName.test(data.recipientName)) errors.push("Invalid recipient name");
  if (!data.amount || isNaN(data.amount) || data.amount <= 0) errors.push("Invalid amount");
  if (!data.currency || !regexCurrency.test(data.currency)) errors.push("Invalid currency");

  // Optional fields
  if (data.recipientAccount && !regexAccount.test(data.recipientAccount)) errors.push("Invalid recipient account");
  if (data.bank && !regexBank.test(data.bank)) errors.push("Invalid bank");
  if (data.country && !regexCountry.test(data.country)) errors.push("Invalid country");

  return errors;
}

// GET all payments for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    console.error("FETCH PAYMENTS ERROR:", err);
    res.status(500).json({ error: "Server error fetching payments" });
  }
});

// POST new payment
router.post("/", auth, async (req, res) => {
  const { recipientName, recipientAccount, bank, country, amount, currency } = req.body;

  const errors = validatePaymentInput({ recipientName, recipientAccount, bank, country, amount, currency });
  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const newPayment = new Payment({
      userId: req.userId,
      recipientName,
      recipientAccount,
      bank,
      country,
      amount,
      currency,
      status: "Pending",
      createdAt: new Date(),
    });
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (err) {
    console.error("CREATE PAYMENT ERROR:", err);
    res.status(500).json({ error: "Server error creating payment" });
  }
});

export default router;

/*
References (Harvard Style):

Express.js (2024) *Express - Node.js web application framework.* Available at: https://expressjs.com/

Mongoose (2024) *Mongoose documentation: Schemas and Models.* Available at: https://mongoosejs.com/docs/guide.html

Node.js Foundation (2024) *Node.js v22.0.0 Documentation.* Available at: https://nodejs.org/en/docs/

Mozilla Developer Network (2024) *Regular expressions (RegExp) - JavaScript documentation.* Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
*/
