const client = require("../libraries/redis");

const getUserRedis = (id) => {
  return client.get(id);
};

const setUserRedis = (userid, user) => {
  return client.set(`${userid}`, JSON.stringify(user));
};

module.exports = {
  getUserRedis,
  setUserRedis,
};
