const knex = require("../libraries/db");

const addItemCart = ({ userId, productId, name, img, price, quantity }) => {
  return knex("cart")
    .insert({
      userId,
      productId,
      name,
      img,
      price,
      quantity,
    })
    .returning("*");
};


const getCartDetails = (userId) => {
  return knex("cart")
    .select("*")
    .where({ userId })
    .then((rows) => {
      //   return Array.isArray(rows);
      return rows;
    });
};

// const getCartDetails = (userId) => {
//   return knex("posts as p")
//     .join("users as u", "u.id", "p.user_id")
//     .select("p.id", "u.username", "p.contents")
//     .where({ user_id: id });
// };

// update cart

const updateCart = ({ userId, quantity, productId }) => {
  return knex("cart")
    .where({ userId, productId })
    .update({ quantity })
    .returning("*");
};

// delete cart item

const deleteItem = ({ userId, productId }) => {
  return knex("cart").where({ userId, productId }).del().returning("*");
};


// clear cart
const emptyCart = ({userId}) => {
  return knex("cart").where({userId}).del().returning("*");
};



module.exports = {
  addItemCart,
  getCartDetails,
  updateCart,
  deleteItem,
  emptyCart,
};
