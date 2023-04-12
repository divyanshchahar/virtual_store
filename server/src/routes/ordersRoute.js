const express = require("express");

const Orders = require("../schema/ordersSchema");

const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    const orders = await Orders.create(req.body);
    console.log(orders);
    res.status(200).send("order placed sucessfully");
  } catch (e) {
    res.status(500).send(e.mesage);
  }
});

module.exports = router;
