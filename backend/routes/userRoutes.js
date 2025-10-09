// backend/routes/userRoutes.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Input validation regex
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^[\S]{6,20}$/;

// ======================
// REGISTER
// ======================
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!usernameRegex.test(username)) {
    return res.status(400).json({ error: "Invalid username. Must be 3-20 letters, numbers, or underscores." });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ error: "Invalid password. Must be 6-20 characters, no spaces." });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ error: "Server error during registration." });
  }
});

// ======================
// LOGIN
// ======================
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // Use environment variable for JWT secret
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET not defined in .env file");
      return res.status(500).json({ error: "Server misconfiguration. JWT secret missing." });
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error during login." });
  }
});

export default router;
