// Import required dependencies
import express from "express";
import { body, validationResult } from "express-validator"; // Used for input validation
import Payment from "../models/paymentModel.js"; // Mongoose model for payment records
import { protect } from "../middleware/auth.js"; // Middleware to verify JWT authentication

// Create a new Express router instance
const router = express.Router();

/**
 * @route   POST /api/payments
 * @desc    Create a new payment record for the authenticated user
 * @access  Private (Protected by JWT authentication)
 */
router.post(
  "/",
  protect, // Middleware ensures that only authenticated users can access this route
  [
    // Validation checks for payment details
    body("recipientName")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Recipient name must be letters only"),

    body("recipientAccount")
      .matches(/^[0-9]{10,20}$/)
      .withMessage("Account number must be 10–20 digits"),

    body("bank")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Bank name must be letters only"),

    body("country")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Country must be letters only"),

    body("amount")
      .isFloat({ gt: 0 })
      .withMessage("Amount must be greater than 0"),

    body("currency")
      .isIn(["USD", "EUR", "GBP", "ZAR"])
      .withMessage("Invalid currency"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      // Create a new payment entry, linked to the authenticated user
      const payment = new Payment({
        user: req.user.id, // Extracted from the JWT token
        ...req.body, // Spread syntax copies all validated form fields
        status: "Pending", // Default status when created
        date: new Date(), // Automatically sets current date and time
      });

      // Save the payment record to the MongoDB database
      await payment.save();

      // Return success response with payment details
      res.status(201).json({ message: "Payment created successfully", payment });
    } catch (err) {
      // Log and return an internal server error message if something goes wrong
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * @route   GET /api/payments
 * @desc    Retrieve all payments made by the authenticated user
 * @access  Private (Protected by JWT authentication)
 */
router.get("/", protect, async (req, res) => {
  try {
    // Find payments associated with the logged-in user's ID and sort by date (newest first)
    const payments = await Payment.find({ user: req.user.id }).sort({ date: -1 });

    // Return the list of payments as JSON
    res.json(payments);
  } catch (err) {
    // Handle any unexpected server errors
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Export the router to be used in other parts of the application
export default router;
