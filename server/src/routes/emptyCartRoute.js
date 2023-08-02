const Cart = require("../schema/cartSchema");
const express = require("express");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

const router = express.Router();

router.route("/").put(authorizationMiddleware, async (req, res) => {
  try {
    const [cart] = await Cart.find({ customerId: req.id });

    if (!cart) return res.status(404).end();

    cart.products = {};

    const updatedCart = await cart.save();

    res.status(200).send(updatedCart).end();
  } catch (error) {
    res.status(500).send(error).end();
  }
});

module.exports = router;
