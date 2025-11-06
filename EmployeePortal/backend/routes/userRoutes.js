import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  console.log("Login request body:", req.body); // DEBUG

  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const secret = process.env.JWT_SECRET || "change_this_secret_in_env";
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

export default router;


/*
References (Harvard Style):

Express.js (2024) *Express - Node.js web application framework.* Available at: https://expressjs.com/

bcrypt (2024) *bcrypt Documentation - Password Hashing Library.* Available at: https://www.npmjs.com/package/bcrypt

jsonwebtoken (2024) *jsonwebtoken - JSON Web Token implementation for Node.js.* Available at: https://www.npmjs.com/package/jsonwebtoken

Node.js Foundation (2024) *Node.js v22.0.0 Documentation.* Available at: https://nodejs.org/en/docs/

Mongoose (2024) *Mongoose documentation: Schemas and Models.* Available at: https://mongoosejs.com/docs/guide.html
*/
