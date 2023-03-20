const {
  addItemCart,
  getCartDetails,
  updateCart,
  deleteItem,
} = require("../models/cart");
const { updateProductState } = require("./product");

// Add item to Cart
async function addToCart(req, res) {
  try {
    const { productId, name, img, price, quantity } = req.body;

    const userId = req.session.userid;

    const cart_item_insert = await addItemCart({
      userId,
      productId,
      name,
      img,
      price,
      quantity,
    });

    if (!cart_item_insert) {
      res.status(400).send({ error: "Uanble to add Item to cart" });
    }
    // const updatedState = await updateProductState(productId, true);
    //  if (!updatedState) {
    //    return res.status(400).send({ message: "product state not updated" });
    //  }
    res.status(200).send({ item: cart_item_insert });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
}

// Get Cart Details
async function getCartItems(req, res) {
  try {
    const userId = req.session.userid;
    const cart_details = await getCartDetails(userId);
    if (!cart_details) {
      return res.status(400).send({ error: "Cart Details not found" });
    }

    let amount = cart_details.reduce((sum, ele) => {
      return sum + ele.quantity * ele.price;
    }, 0);
    return res
      .status(200)
      .send({ data: { cart_items: cart_details, total_amount: amount } });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
}

// update cart

async function updateCartItem(req, res) {
  try {
    const userId = req.session.userid;
    const { quantity } = req.body;
    const productId = req.params.productId;

    const updated_item = await updateCart({
      userId,
      quantity,
      productId,
    });

    if (!updated_item) {
      return res.status(400).send({ error: "Item could not be updated" });
    }

    return res.status(200).send({ message: "cart updated" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: error.message });
  }
}

// delete cart item

async function deleteCartItem(req, res) {
  try {
    const userId = req.session.userid;
    const productId = req.params.productId;
    const deleted_item = await deleteItem({ userId, productId });
    if (!deleted_item) {
      return res.status(400).send({ error: "Item could not be deleted" });
    }
    // const updatedState = await updateProductState(productId, false);
    // if (!updatedState) {
    //   return res.status(400).send({ message: "product state not updated" });
    // }
    return res.status(200).send({ message: "Item deleted successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
}

module.exports = {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
};
