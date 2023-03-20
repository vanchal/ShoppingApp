const router = require("express").Router();
const orderController = require("../controllers/order");
const jwtAuthenticator = require("../middleware/jwt-authenticator");

router.post("/placeOrder", jwtAuthenticator, orderController.order_detail);

module.exports = router;
