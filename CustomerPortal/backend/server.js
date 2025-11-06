import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import fs from "fs";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/payments.js";
import { protect } from "./middleware/auth.js"; // JWT middleware

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🧩 Security & Middleware
app.use(express.json());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// ✅ CORS for HTTPS frontend
app.use(
  cors({
    origin: "https://localhost:3000",
    credentials: true,
  })
);

// 🔗 API Routes
app.use("/api/users", userRoutes);
app.use("/api/payments", protect, paymentRoutes);

// ✅ Root route for testing HTTPS
app.get("/", (req, res) => {
  res.send("✅ Secure Customer Portal API is running over HTTPS!");
});

// 🌐 MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🔒 HTTPS Server Setup
const certPath = path.join(__dirname, "cert");
const keyFile = path.join(certPath, "localhost+2-key.pem");
const certFile = path.join(certPath, "localhost+2.pem");

// Check SSL certs
if (!fs.existsSync(keyFile) || !fs.existsSync(certFile)) {
  console.error("❌ SSL certificates not found. Use mkcert to create them in 'backend/cert'");
  process.exit(1);
}

const httpsOptions = {
  key: fs.readFileSync(keyFile),
  cert: fs.readFileSync(certFile),
};

// Start HTTPS server
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`✅ HTTPS Server running at https://localhost:${PORT}`);
});
