const express = require("express");

const checkJwt = require("../middleware/checkJwt");

const { checkOrdersScopes } = require("../middleware/checkScopes");

const Orders = require("../schema/ordersSchema");

const router = express.Router();

router
  .route("/:customerId")
  .get(checkJwt, checkOrdersScopes, async (req, res) => {
    try {
      const orders = await Orders.find({ customerId: req.params.customerId });
      res.status(200).send(orders);
    } catch (e) {
      res.status(500).send(e.mesage);
    }
  });

router.route("/").post(checkJwt, checkOrdersScopes, async (req, res) => {
  try {
    const orders = await Orders.create(req.body);
    res.status(200).send("order placed sucessfully");
  } catch (e) {
    res.status(500).send(e.mesage);
  }
});

module.exports = router;
