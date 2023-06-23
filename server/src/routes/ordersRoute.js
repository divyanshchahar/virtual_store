const express = require("express");
const Orders = require("../schema/ordersSchema");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

const router = express.Router();

router.route("/").get(authorizationMiddleware, async (req, res) => {
  try {
    // if (!req.params.customerId) return res.sendStatus(400);

    const orders = await Orders.find({ customerId: req.id });

    if (!orders) return res.sendStatus(404);

    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error.mesage);
  }
});

router.route("/").post(authorizationMiddleware, async (req, res) => {
  try {
    const orders = await Orders.create({ customerId: req.id, ...req.body });
    res.send(orders).status(200);
  } catch (error) {
    res.status(500).send(error.mesage);
  }
});

module.exports = router;
