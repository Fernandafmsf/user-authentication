import jwt from "jsonwebtoken";
import { has as isBlacklisted } from "../utils/tokenBlacklist.js";

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token was not provided" });
  }

  const token = authHeader.replace("Bearer ", "");

  if (isBlacklisted(token)) {
    return res.status(401).json({ error: "Token is invalidated" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Access denied" });
  }
};

export default auth;