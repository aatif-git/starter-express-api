const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticateToken = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token missing!" });
  }
  const SECRET_KEY = process.env.SECRET_KEY;
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden - Invalid token" });
    }

    req.user = user;
    next();
  });
};
