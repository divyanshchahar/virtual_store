const express = require("express");
const Cart = require("../schema/cartSchema");
const User = require("../schema/userSchema");
const Product = require("../schema/productSchema");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

const router = express.Router();

router.route("/").get(authorizationMiddleware, async (req, res) => {
  try {
    const [cart] = await Cart.find({ customerId: req.id });

    if (!cart) return res.sendStatus(404);

    res.status(200).send(cart);
  } catch (error) {
    res.send(error.message).status(404);
  }
});

router.route("/").post(authorizationMiddleware, async (req, res) => {
  try {
    if (!req.body.productId) return res.sendStatus(400);

    const isProduct = await Product.findById(req.body.productId);

    if (!isProduct) return res.sendStatus(404);

    const cart = await Cart.create({
      customerId: null || req.id,
      products: [
        { productId: null || req.body.productId, qty: null || req.body.qty },
      ],
    });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.route("/").put(authorizationMiddleware, async (req, res) => {
  try {
    let itemNotPresent = true;
    let isQty = false;

    if (req?.body?.qty || req?.body?.qty === 0) isQty = true;

    if (!req.body.productId || !isQty) return res.sendStatus(400);

    const isCustomer = await User.findById(req.id);
    const isProduct = await Product.findById(req.body.productId);
    const [cart] = await Cart.find({ customerId: req.id });

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
