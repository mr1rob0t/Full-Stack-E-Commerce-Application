const jwt = require("jsonwebtoken");

// Middleware to authenticate a user
exports.auth = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  // Check if no token
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded;

    next();
  } catch (err) {
    res.status(400).json({ message: "Token is not valid" });
  }
};

// Middleware to authorize admin users
exports.admin = (req, res, next) => {
  if (!req.user.isAdmin)
    return res.status(403).json({ message: "Access denied" });
  next();
};
