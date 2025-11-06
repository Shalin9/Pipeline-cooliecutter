// app.js
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import cookieParser from "cookie-parser";
import xss from "xss-clean";
import authRoutes from "./routes/authRoutes.js";
import paymentsRoutes from "./routes/paymentsRoutes.js";
import dotenv from "dotenv";
dotenv.config();

export default async function createApp() {
  const app = express();

  // Basic security headers
  app.use(helmet());

  // Body parsing
  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true }));

  // Cookie parser
  app.use(cookieParser());

  // Protect against XSS in request bodies
  app.use(xss());

  // CORS - restrict origins to your frontend(s)
  const allowedOrigins = [
    "http://localhost:3000",        // customer frontend during dev
    "http://localhost:4000",        // employee frontend dev port (if used)
    "https://your-production-url"   // adjust for production
  ];
  app.use(cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like curl, postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS policy: origin not allowed"), false);
      }
      return callback(null, true);
    },
    credentials: true
  }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/payments", paymentsRoutes);

  // Generic error handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
  });

  return app;
}

  /*
References (Harvard Style):

bcrypt (2024) *bcrypt Documentation - Password Hashing Library.* Available at: https://www.npmjs.com/package/bcrypt

jsonwebtoken (2024) *jsonwebtoken - JSON Web Token implementation for Node.js.* Available at: https://www.npmjs.com/package/jsonwebtoken

dotenv (2024) *dotenv - Environment variable management for Node.js.* Available at: https://www.npmjs.com/package/dotenv

Node.js Foundation (2024) *Node.js v22.0.0 Documentation.* Available at: https://nodejs.org/en/docs/

Mozilla Developer Network (2024) *Working with Environment Variables in Node.js.* Available at: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/environment_variables
*/
