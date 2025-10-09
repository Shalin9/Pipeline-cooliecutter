// backend/server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/payments.js";
import { protect } from "./middleware/auth.js"; // JWT middleware

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: "Too many requests from this IP, please try again later",
});
app.use(limiter);

// CORS: allow frontend requests
app.use(
  cors({
    origin: "http://localhost:3000", // React dev server
    credentials: true,               // allow cookies / auth headers
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/payments", protect, paymentRoutes);

// MongoDB connection
mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://ShalinUser:Sept2002Shay@cluster0.2dqorr5.mongodb.net/Customer-Portal?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
