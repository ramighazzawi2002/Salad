const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Access denied." });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user.id;
    console.log("Token verified successfully. User ID:", req.user);
    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);
    res.status(500).send("Error verifying token: " + error.message);
  }
};

module.exports = auth;


