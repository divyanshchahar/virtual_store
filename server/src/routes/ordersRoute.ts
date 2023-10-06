import express from "express";
import authorizationMiddleware from "../middleware/authorizationMiddleware";
import Orders from "../schema/ordersSchema";

const router = express.Router();

router.route("/").get(authorizationMiddleware, async (req, res) => {
  try {
    const orders = await Orders.find({ customerId: req.id });

    if (!orders) return res.status(404).end();

    res.status(200).send(orders).end();
  } catch (error) {
    res.status(500).send(error).end();
  }
});

router.route("/").post(authorizationMiddleware, async (req, res) => {
  try {
    const orders = await Orders.create({ customerId: req.id, ...req.body });
    res.status(200).send(orders).end();
  } catch (error) {
    res.status(500).send(error).end();
  }
});

export default router;
