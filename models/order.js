const knex = require("../libraries/db");
const { v4: uuid } = require("uuid");

const placeOrder = (userId, item, total) => {
  return knex("order_detail")
    .insert({
      orderId: uuid(),
      userId,
      cartDetail: item,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      total,
      orderStatus: "complete",
    })
    .returning("*");
};

module.exports = {
  placeOrder,
};
