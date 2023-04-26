const express = require("express");
const Cart = require("../schema/cartSchema");

const checkJwt = require("../middleware/checkJwt");
const { checkCartScopes } = require("../middleware/checkScopes");

const router = express.Router();

router
  .route("/:customerId")
  .get(checkJwt, checkCartScopes, async (req, res) => {
    try {
      const [cart] = await Cart.find({ customerId: req.params.customerId });
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

router.route("/").post(checkJwt, checkCartScopes, async (req, res) => {
  try {
    const data = {
      customerId: req.body.customerId,
      products: [{ productId: req.body.productId, qty: req.body.qty }],
    };

    const cart = await Cart.create(data);
    res.status(200).send(cart);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.route("/").put(checkJwt, checkCartScopes, async (req, res) => {
  try {
    let itemNotPresent = true;

    const [cart] = await Cart.find({ customerId: req.body.customerId });

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
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
