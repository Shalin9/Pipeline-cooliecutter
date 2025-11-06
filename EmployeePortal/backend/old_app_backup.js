// app.js
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import xss from 'xss-clean';
import authRoutes from './routes/authRoutes.js';
import paymentsRoutes from './routes/paymentsRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

export default async function createApp() {
  const app = express();

  // Basic security headers
  app.use(helmet());

  // Body parsing
  app.use(express.json({ limit: '10kb' })); // limit payloads
  app.use(express.urlencoded({ extended: true }));

  // Cookie parser
  app.use(cookieParser());

  // Protect against XSS in request bodies
  app.use(xss());

  // CORS - restrict origins to your frontend(s)
  const allowedOrigins = [
    'http://localhost:3000',        // customer frontend during dev
    'http://localhost:4000',        // employee frontend dev port (if used)
    'https://your-production-url'   // adjust for production
  ];
  app.use(cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like curl, postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error('CORS policy: origin not allowed'), false);
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
  app.use('/api/auth', authRoutes);
  app.use('/api/payments', paymentsRoutes);

  // Generic error handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
  });

  return app;
}
