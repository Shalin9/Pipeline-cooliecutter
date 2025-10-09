import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = 5001;

// Middleware
app.use(express.json());
app.use(helmet()); // adds secure headers

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // max 100 requests per window per IP
  message: "Too many requests from this IP, please try again later"
});
app.use(limiter);

// CORS
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true
}));

// Routes
app.use("/api/users", userRoutes);

// MongoDB Connection
mongoose.connect(
  `mongodb+srv://ShalinUser:Sept2002Shay@cluster0.2dqorr5.mongodb.net/Customer-Portal?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
