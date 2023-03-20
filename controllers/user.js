const {
  validateEmail,
  validateName,
  validatePassword,
} = require("../helpers/validation");

const {
  getUserByEmail,
  createUser,
  getUser,
  getPassword,
} = require("../models/user");

const { getUserRedis, setUserRedis } = require("../models/redis");

const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const JWT_Key = "sretsdfhghljlhkwdkhwejdopwkowjdio";

// User Registration
async function registration(req, res) {
  try {
    const { username, email, password } = req.body;
    if (
      !validateEmail(email) ||
      !validateName(username) ||
      !validatePassword(password)
    ) {
      return res.status(400).send({
        message:
          "All fields are required!, and password must be 8 characters long and must have a number, a lower case character and a upper case character",
      });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).send({ error: "User email already exists" });
    }
    const newUser = await createUser({
      username,
      email,
      password,
    });

    if (newUser) {
      return res.status(200).json({
        username,
        email,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong", error: error.message });
  }
}

// User Login
async function loginByEmail(req, res) {
  try {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).send({ message: "Enter valid email" });
    }

    if (!validatePassword(password)) {
      return res.status(400).send({
        message:
          "All fields are required!, and password must be 8 characters long and must have a number, a lower case character and a upper case character",
      });
    }

    const existingUser = await getUserByEmail(email);
    console.log(existingUser);
    if (!existingUser) {
      return res.status(404).send({ message: "User does not exist" });
    }

    const enterPassword = await getPassword(email);
    console.log(enterPassword);

    const newHash = crypto.createHash("sha256").update(password).digest("hex");
    console.log(newHash);

    if (newHash !== enterPassword) {
      return res.status(400).send({ message: "password dosen't match" });
    }

    const token = jwt.sign({ userid: existingUser.userid }, JWT_Key);
    res.cookie("token", token, { maxAge: 10000 });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Fetch User Details

const me = async (req, res) => {
  try {
    const userRedis = await getUserRedis(req.session.userid);
    if (userRedis) {
      const user = JSON.parse(userRedis);
      const { username, email, phone, img } = user;
      return res.status(200).send({ username, email, phone, img });
    }
    const user = await getUser(req.session.userid);
    if (user && user.userid) {
      setUserRedis(user.userid, user);
      const { username, email, phone, img } = user;
      return res.status(200).send({ username, email, phone, img });
    }
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports = {
  registration,
  loginByEmail,
  me,
};
