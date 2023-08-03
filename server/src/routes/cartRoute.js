const express = require("express");
const Cart = require("../schema/cartSchema");
const User = require("../schema/userSchema");
const Product = require("../schema/productSchema");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

const router = express.Router();

router.route("/").get(authorizationMiddleware, async (req, res) => {
  try {
    const [cart] = await Cart.find({ customerId: req.id });

    if (!cart) return res.status(404).end();

    res.status(200).send(cart).end();
  } catch (error) {
    res.status(500).send(error).end();
  }
});

router.route("/").post(authorizationMiddleware, async (req, res) => {
  try {
    let hasQty = false;

    if (req?.body?.qty || req?.body?.qty === 0) hasQty = true;

    if (!req.body.productId || !hasQty) return res.status(400).end();

    const isProduct = await Product.findById(req.body.productId);

    if (!isProduct) return res.status(404).end();

    const cart = await Cart.create({
      customerId: req.id,
      products: [{ productId: req.body.productId, qty: req.body.qty }],
    });

    res.status(200).send(cart).end();
  } catch (error) {
    res.status(500).send(error).end();
  }
});

router.route("/").put(authorizationMiddleware, async (req, res) => {
  try {
    let itemNotPresent = true;
    let hasQty = false;

    if (req?.body?.qty || req?.body?.qty === 0) hasQty = true;

    if (!req.body.productId || !hasQty) return res.status(400).end();

    const isCustomer = await User.findById(req.id);
    const isProduct = await Product.findById(req.body.productId);
    const [cart] = await Cart.find({ customerId: req.id });

    if (!isCustomer || !isProduct || !cart) return res.status(404).end();

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

    const updatedCart = await cart.save();

    res.status(200).send(updatedCart).end();
  } catch (error) {
    res.status(500).send(error).end();
  }
});

router.route("/").delete(authorizationMiddleware, async (req, res) => {
  try {
    const { isDeleted } = await Cart.deleteOne({ customerId: req.id });
    if (isDeleted.deletecount > 0) return res.status(200).send({}).end();
    return res.status(404).end();
  } catch (error) {
    return res.send(error).status(500).end();
  }
});

module.exports = router;
