const express = require("express");
const Cart = require("../schema/cartSchema");

const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(200).send(cart._id);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.route("/").put(async (req, res) => {
  try {
    let itemNotPresent = true;

    const cart = await Cart.findById(req.body._id);

    cart.products = cart.products.map((item) => {
      if (item.productId == req.body.productId) {
        item.qty = req.body.qty;
        itemNotPresent = false;
        return item;
      }
      return item;
    });

    if (itemNotPresent) {
      cart.products.push({ productId: req.body.productId, qty: req.body.qty });
    }

    cart.products = cart.products.filter((item) => item.qty > 0);

    console.log(cart.products);
    await cart.save();

    res.status(200).send("cart updated sucessfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
