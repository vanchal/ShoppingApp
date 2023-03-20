const express = require("express");
const app = express();
app.use(express.json());
const userRoutes = require("./user");
const productRoutes = require("./product");
const cartRoutes = require("./cart");
const orderRoutes = require("./order");

// app.use("/", (req, res, next) => {
//   console.log(req.body);
//   next();
// });

app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);

module.exports = app;
