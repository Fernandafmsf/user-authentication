import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const isAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token was not provided" });
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || decoded.role !== "ADMIN") {
      return res.status(403).json({ error: "Access denied: Admins only" });
    }

    req.userId = decoded.userId;
    req.user = { role: decoded.role };

    return next();
  } catch (error) {
    console.error("isAdmin token error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default isAdmin;
