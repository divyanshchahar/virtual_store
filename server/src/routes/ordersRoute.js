const express = require("express");

const checkJwt = require("../middleware/checkJwt");

const { checkOrdersScopes } = require("../middleware/checkScopes");

const Orders = require("../schema/ordersSchema");

const router = express.Router();

router.route("/").post(checkJwt, checkOrdersScopes, async (req, res) => {
  try {
    const orders = await Orders.create(req.body);
    console.log(orders);
    res.status(200).send("order placed sucessfully");
  } catch (e) {
    res.status(500).send(e.mesage);
  }
});

module.exports = router;
