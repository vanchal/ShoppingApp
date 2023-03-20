const router = require("express").Router();
const productController = require("../controllers/product");
const jwtAuthenticator = require("../middleware/jwt-authenticator");

router.get("/", jwtAuthenticator, productController.getProd);

router.get("/category", productController.getCategory);

router.get("/:id", productController.getProdById);

// router.put(
//   "/updateState/:productId",
//   jwtAuthenticator,
//   productController.updateProductState
// );

module.exports = router;
