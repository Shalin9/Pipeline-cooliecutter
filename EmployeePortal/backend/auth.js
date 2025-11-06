// auth.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "12", 10);
const JWT_SECRET = process.env.JWT_SECRET || "change_me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export async function hashPassword(plain) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(plain, salt);
}

export async function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

export function signJWT(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJWT(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

// simple middleware to protect routes via Authorization header
export function jwtMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing token" });
  }
  const token = authHeader.split(" ")[1];
  const payload = verifyJWT(token);
  if (!payload) return res.status(401).json({ error: "Invalid token" });
  req.user = payload;
  next();
}

/*
References (Harvard Style):

bcrypt (2024) *bcrypt Documentation - Password Hashing Library.* Available at: https://www.npmjs.com/package/bcrypt

jsonwebtoken (2024) *jsonwebtoken - JSON Web Token implementation for Node.js.* Available at: https://www.npmjs.com/package/jsonwebtoken

dotenv (2024) *dotenv - Environment variable management for Node.js.* Available at: https://www.npmjs.com/package/dotenv

Node.js Foundation (2024) *Node.js v22.0.0 Documentation.* Available at: https://nodejs.org/en/docs/

Mozilla Developer Network (2024) *Working with Environment Variables in Node.js.* Available at: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/environment_variables
*/
