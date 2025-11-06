// Import required modules and dependencies
import express from "express";
import bcrypt from "bcrypt"; // Library for securely hashing passwords
import jwt from "jsonwebtoken"; // Library for generating and verifying JSON Web Tokens
import User from "../models/User.js"; // Mongoose model for interacting with the 'User' collection

// Create an Express router instance to define authentication routes
const router = express.Router();

// Regular expressions for validating user input
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Allows letters, numbers, and underscores (3–20 characters)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validates basic email format
const passwordRegex = /^[\S]{6,20}$/; // Ensures password has 6–20 non-space characters

/**
 * @route   POST /api/auth/register
 * @desc    Registers a new user after validating input and hashing the password
 * @access  Public
 */
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input fields using regex patterns
  if (!usernameRegex.test(username))
    return res.status(400).json({ error: "Invalid username" });
  if (!emailRegex.test(email))
    return res.status(400).json({ error: "Invalid email" });
  if (!passwordRegex.test(password))
    return res.status(400).json({ error: "Invalid password" });

  try {
    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ error: "Username already exists" });

    // Hash the password using bcrypt for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document and save it in MongoDB
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Return a success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    // Handle any server-side errors gracefully
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticates user credentials and returns a signed JWT
 * @access  Public
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by their username in the database
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Ensure the JWT secret key is defined in environment variables
    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ error: "JWT secret missing" });

    // Generate a signed JWT that expires in 1 hour
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });

    // Respond with user details and authentication token
    res.json({
      message: "Login successful",
      token,
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    // Handle login errors (e.g. database or hashing issues)
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// Export the router for use in the main server file
export default router;
