const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../schema/userSchema");
const Cart = require("../schema/cartSchema");
const Order = require("../schema/ordersSchema");

const router = express.Router();

router.route("/:userId").get(async (req, res) => {
  try {
    if (!req.params.userId) return res.sendStatus(400);

    const user = await User.findById(req.params.userId);

    if (!user) return res.sendStatus(404);

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// router.route("/").post(async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(200).send(user._id);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });

router.route("/").put(async (req, res) => {
  try {
    if (!req.body._id) return res.sendStatus(400);

    const user = await User.findById(req.body._id);

    if (!user) return res.sendStatus(404);

    user.name = null || req.body.name;
    user.email = null || req.body.email;
    user.password = null || (await bcrypt.hash(req.body.password, 10));

    user.address.house = null || req.body.address.house;
    user.address.street = null || req.body.address.street;
    user.address.city = null || req.body.address.city;
    user.address.pin = null || req.body.address.pin;
    user.address.country = null || req.body.address.country;

    user.payments.nameOnCard = null || req.body.payments.nameOnCard;
    user.payments.cardNo = null || req.body.payments.cardNo;
    user.payments.validFrom = null || req.body.payments.validFrom;
    user.payments.validUpto = null || req.body.payments.validUpto;
    user.payments.cvv = null || req.body.payments.cvv;

    user.save();

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.route("/:userId").delete(async (req, res) => {
  try {
    if (!req.params.userId) return res.sendStatus(400);

    const isDeleted = await User.findByIdAndDelete(req.params.userId);

    if (!isDeleted) return res.sendStatus(400);
    // const cart = await Cart.deleteMany({ customerId: req.params.id });
    // const orders = await Order.deleteMany({ customerId: req.params.id });
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
