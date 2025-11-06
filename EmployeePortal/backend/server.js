// server.js
import https from "https";
import fs from "fs";
import path from "path";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import cookieParser from "cookie-parser";
import xss from "xss-clean";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Environment variables
const PORT = process.env.PORT || 4430;
const SSL_KEY_PATH =
  process.env.SSL_KEY_PATH || path.resolve("../../localhost+2-key.pem");
const SSL_CERT_PATH =
  process.env.SSL_CERT_PATH || path.resolve("../../localhost+2.pem");
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://ShalinUser:Sept2002Shay@cluster0.2dqorr5.mongodb.net/Employee-Portal?retryWrites=true&w=majority";

async function createApp() {
  const app = express();

  // ----------------- Security Middlewares -----------------
  app.use(helmet()); // Basic security headers
  app.use(xss()); // XSS protection
  app.use(cookieParser());
  app.use(express.json({ limit: "10kb" })); // Limit JSON body size
  app.use(express.urlencoded({ extended: false, limit: "10kb" }));

  // Rate Limiter (prevent brute-force)
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 min
      max: 300,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  // CORS configuration
  app.use(
    cors({
      origin: ["http://localhost:3000", "https://localhost:3000", "http://localhost:3001", "https://localhost:3001"],
      credentials: true,
    })
  );

  // ----------------- Health Check -----------------
  app.get("/healthz", (req, res) => res.json({ ok: true }));

  // ----------------- Mount Routes -----------------
  try {
    const userRoutes = await import("./routes/userRoutes.js");
    app.use("/api/auth", userRoutes.default || userRoutes);
    console.log("✅ Mounted /api/auth");

    const paymentsRoutes = await import("./routes/paymentsRoutes.js");
    app.use("/api/payments", paymentsRoutes.default || paymentsRoutes);
    console.log("✅ Mounted /api/payments");
  } catch (err) {
    console.error("❌ Error mounting routes:", err);
  }

  // ----------------- 404 Handler -----------------
  app.use((req, res) => res.status(404).json({ error: "Not Found" }));

  // ----------------- Global Error Handler -----------------
  app.use((err, req, res, next) => {
    console.error("❌ Unhandled error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  });

  return app;
}

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }

  const app = await createApp();

  if (!fs.existsSync(SSL_KEY_PATH) || !fs.existsSync(SSL_CERT_PATH)) {
    console.error("❌ SSL key/cert not found");
    process.exit(1);
  }

  const options = {
    key: fs.readFileSync(SSL_KEY_PATH),
    cert: fs.readFileSync(SSL_CERT_PATH),
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(`🔒 HTTPS server running at https://localhost:${PORT}`);
  });
}

if (import.meta.url === `file://${process.argv[1]}` || !process.env.JEST_WORKER_ID) {
  startServer();
}

export default createApp;
