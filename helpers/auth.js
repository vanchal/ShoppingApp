const jwt = require("jsonwebtoken");

function verifyToken(token, privateKey) {
  const payload = jwt.verify(token, privateKey);
  console.log(payload);
  return payload;
}

module.exports = { verifyToken };
