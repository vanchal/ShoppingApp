const router = require("express").Router();
const cartController = require("../controllers/cart");
const jwtAuthenticator = require("../middleware/jwt-authenticator");

router.post("/addItemCart", jwtAuthenticator, cartController.addToCart);
router.get("/getCart", jwtAuthenticator, cartController.getCartItems);
router.put(
  "/updateCart/:productId",
  jwtAuthenticator,
  cartController.updateCartItem
);
router.delete(
  "/deleteCart/:productId",
  jwtAuthenticator,
  cartController.deleteCartItem
);

module.exports = router;
