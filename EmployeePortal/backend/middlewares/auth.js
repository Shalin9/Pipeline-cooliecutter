// middlewares/auth.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expect "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing" });
  }

  try {
    const secret = process.env.JWT_SECRET || "change_this_secret_in_env";
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id; // attach user id to request
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(403).json({ error: "Invalid token" });
  }
};
