const express = require("express");
const Products = require("../schema/productSchema");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).send(products);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.route("/:productId").get(async (req, res) => {
  try {
    const result = await Products.findById(req.params.productId);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
