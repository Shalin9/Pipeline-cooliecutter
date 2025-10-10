import express from "express";
import { body, validationResult } from "express-validator";
import Payment from "../models/paymentModel.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/",
  protect,
  [
    body("recipientName").matches(/^[a-zA-Z\s]+$/).withMessage("Recipient name must be letters only"),
    body("recipientAccount").matches(/^[0-9]{10,20}$/).withMessage("Account number must be 10-20 digits"),
    body("bank").matches(/^[a-zA-Z\s]+$/).withMessage("Bank name must be letters only"),
    body("country").matches(/^[a-zA-Z\s]+$/).withMessage("Country must be letters only"),
    body("amount").isFloat({ gt: 0 }).withMessage("Amount must be greater than 0"),
    body("currency").isIn(["USD", "EUR", "GBP", "ZAR"]).withMessage("Invalid currency")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const payment = new Payment({ user: req.user.id, ...req.body, status: "Pending", date: new Date() });
      await payment.save();
      res.status(201).json({ message: "Payment created successfully", payment });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.get("/", protect, async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id }).sort({ date: -1 });
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
