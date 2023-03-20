const { getCartDetails } = require("../models/cart");
const { placeOrder } = require("../models/order");

// place order
async function order_detail(req, res) {
  const userId = req.session.userid;
  const total = req.body.total;
  console.log(total);
  const cartDetail = await getCartDetails(userId);
  if (!cartDetail) {
    res.status(404).send({ error: "Nothing found in Cart" });
  }
  const item = { items: cartDetail };
  console.log(item);
  const order = await placeOrder(userId, item, total);
  if (!order) {
    res.status(400).send({ error: "Order not placed" });
  }

  res.status(200).send({ message: "Order placed successfully" });
}

module.exports = {
  order_detail,
};
