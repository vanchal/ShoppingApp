const { verifyToken } = require("../helpers/auth");

const jwtAuthenticator = (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.includes("Bearer")
  ) {
    return res.status(400).send({
      message: "Token not found",
    });
  }

  const token = req.headers.authorization.split(" ")[1];
  const payload = verifyToken(token, "sretsdfhghljlhkwdkhwejdopwkowjdio");
  if (!payload) {
    return res.send("invalid");
  }

  req.session = payload;
  console.log(payload);

  next();
};

module.exports = jwtAuthenticator;
