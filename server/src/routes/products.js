const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  images: [String],
});

const Products = mongoose.model("products", ProductSchema);

router.route("/").get(async (req, res) => {
  try {
    const result = await Products.find();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const result = await Products.findById(req.params.id);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
