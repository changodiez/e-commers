const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header("jwt_token");

  //Checking if not token
  if (!token) {
    return res.status(403).json({ msg: "Authorization denied" });
  }

  // Verify token
  try {
    const verify = jwt.verify(token, process.env.jwtSecret);

    req.user = verify.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
