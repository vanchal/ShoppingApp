const {
  prodList,
  prodId,
  category,
  updateState,
  productCartList,
} = require("../models/product");

//Get product list
async function getProd(req, res) {
  try {
    const productList = await prodList();
    if (!productList) {
      res.status(400).send({ error: "productList not found" });
    }
    const userId = req.session.userid;
    const combineList = await productCartList(userId);
    console.log("combined", combineList);
    if (combineList) {
      res.status(200).send({ data: combineList });
    }
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
}

// get product by id

async function getProdById(req, res) {
  try {
    const id = req.params.id;
    const productById = await prodId(id);
    if (!productById) {
      return res.status(400).send({ error: "productId not found" });
    }
    return res.status(200).send(productById);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
}

// get product Category
async function getCategory(req, res) {
  try {
    const prodCategory = await category();
    if (!prodCategory) {
      return res.status(400).send({ error: "product category dosent exist" });
    }
    return res.status(200).send(prodCategory);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
}

// update state of item in productlist if present in cart

async function updateProductState(productId, incart) {
  try {
    // const userId = req.session.userid;
    // const { incart } = req.body;
    // const productId = req.params.productId;

    const updated_product_state = await updateState({
      productId,
      incart,
    });
    if (!updated_product_state) {
      //   return res.status(400).send({ error: "Item state could not be updated" });
      return false;
    }
    // return res.status(200).send({ message: "product state updated" });
    return true;
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: error.message });
  }
}

module.exports = {
  getProd,
  getProdById,
  getCategory,
  updateProductState,
};
