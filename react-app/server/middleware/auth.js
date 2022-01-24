/*
* This script implements the usage of the auth by token
* simply verifying the token inputed and the token available 
* The user create a password and gets in return a token that is the way to connect with the service
* so the database doesnt have password info in plain text
*/

const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) { // export the module to be able to access it outside this path
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};