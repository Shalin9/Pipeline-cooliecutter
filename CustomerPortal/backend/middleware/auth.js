// Import the JSON Web Token (JWT) library used for verifying and decoding tokens
import jwt from "jsonwebtoken";

/**
 * Middleware function to protect routes from unauthorised access.
 * This function checks for a valid JWT token in the request header,
 * verifies it using a secret key, and attaches the decoded user data
 * to the request object for downstream use.
 */
export const protect = (req, res, next) => {
  // Extract the token from the 'Authorization' header (Bearer <token>)
  const token = req.headers.authorization?.split(" ")[1];

  // If no token is found, the user is not authorised
  if (!token) return res.status(401).json({ message: "Not authorised" });

  try {
    // Verify the token using the secret key stored in the environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Allow the request to proceed to the next middleware or controller
    next();
  } catch {
    // If verification fails (e.g., token expired or invalid), return an error
    res.status(401).json({ message: "Token invalid or expired" });
  }
};
