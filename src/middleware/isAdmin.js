const isAdmin = (req, res, next) => {
  const user = req.user;
  console.log('User in isAdmin middleware:', user);
  if (!user) return res.status(401).json({ error: "Not authenticated" });

  if (user.role !== "ADMIN") {
    return res.status(403).json({ error: "Access denied: Admins only" });
  }

  return next();
};

export default isAdmin;
