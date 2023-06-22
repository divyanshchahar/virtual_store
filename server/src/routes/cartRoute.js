const express = require("express");
const Cart = require("../schema/cartSchema");
const User = require("../schema/userSchema");
const Product = require("../schema/productSchema");

const router = express.Router();

router.route("/:customerId").get(async (req, res) => {
  try {
    if (!req.params.customerId) return res.sendStatus(400);

    const [cart] = await Cart.find({ customerId: req.params.customerId });

    if (!cart) return res.sendStatus(404);

    res.status(200).send(cart);
  } catch (error) {
    res.send(error.message).status(404);
  }
});

router.route("/").post(async (req, res) => {
  try {
    if (!req.body.customerId || !req.body.productId) return res.sendStatus(400);

    const isUser = await User.findById(req.body.customerId);
    const isProduct = await Product.findById(req.body.productId);

    if (!isUser || !isProduct) return res.sendStatus(404);

    const cart = await Cart.create({
      customerId: null || req.body.customerId,
      products: [
        { productId: null || req.body.productId, qty: null || req.body.qty },
      ],
    });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.route("/").put(async (req, res) => {
  try {
    let itemNotPresent = true;

    if (!req.body.customerId || !req.body.productId || !req.body.qty)
      return res.sendStatus(400);

    const isCustomer = User.findById(req.body.customerId);
    const isProduct = User.findById(req.body.productId);
    const [cart] = await Cart.find({ customerId: req.body.customerId });

    if (!isCustomer || !isProduct || !cart) return res.sendStatus(404);

    // updating product quantity
    cart.products = cart.products.map((item) => {
      if (item.productId == req.body.productId) {
        item.qty = req.body.qty;
        itemNotPresent = false;
        return item;
      }
      return item;
    });

    // pushing product if not present
    if (itemNotPresent) {
      cart.products.push({ productId: req.body.productId, qty: req.body.qty });
    }

    // removing products
    cart.products = cart.products.filter((item) => item.qty > 0);

    await cart.save();

    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
