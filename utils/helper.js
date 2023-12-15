const jwt = require("jsonwebtoken");

exports.generateToken = (id) => {
  return jwt.sign({ id }, "anykey", { expiresIn: "5d" });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, "anykey", (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
};