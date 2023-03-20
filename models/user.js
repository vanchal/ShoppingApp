const knex = require("../libraries/db");
const { v4: uuid } = require("uuid");
const crypto = require("crypto");

const getUserByEmail = async (email) => {
  return knex("users")
    .select("*")
    .where({ email })
    .then((rows) => {
      return Array.isArray(rows) && rows[0];
    });
};

// const createUser = ({ username, email }) => {
//   return knex("users")
//     .insert({
//       userid: uuid(),
//       username,
//       email,
//       createdAt: new Date().getTime(),
//     })
//     .returning("*");
// };

const createUser = ({ username, email, password }) => {
    const passwordHash = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
  return knex("users")
    .insert({
      userid: uuid(),
      username,
      email,
      createdAt: new Date().getTime(),
      password : passwordHash,
    })
    .returning("*");
};

// const createEmail = ({ email, password }) => {
//   const passwordHash = crypto
//     .createHash("sha256")
//     .update(password)
//     .digest("hex");
//   return knex("users")
//     .insert({
//       email,
//       password: passwordHash,
//     })
//     .returning("*");
// };


const getUser = (sessionId) => {
  return knex("users")
    .select("*")
    .where({ userid: sessionId })
    .then((rows) => {
      return Array.isArray(rows) && rows[0];
    });
};


function getPassword(email) {
  return knex("users")
    .select("password")
    .where({ email })
    .then((rows) => {
      return Array.isArray(rows) && rows[0].password;
    });
}


module.exports = {
  getUserByEmail,
  createUser,
  getUser,
  getPassword,
};
