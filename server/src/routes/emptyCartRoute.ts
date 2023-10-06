import express from "express";
import authorizationMiddleware from "../middleware/authorizationMiddleware";
import { Cart } from "../schema/cartSchema";

const router = express.Router();

router.route("/").put(authorizationMiddleware, async (req, res) => {
  try {
    const [cart] = await Cart.find({ customerId: req.id });

    if (!cart) return res.status(404).end();

    cart.products = [];

    const updatedCart = await cart.save();

    res.status(200).send(updatedCart).end();
  } catch (error) {
    res.status(500).send(error).end();
  }
});

export default router;
