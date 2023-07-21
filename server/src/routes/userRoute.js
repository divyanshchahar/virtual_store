const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../schema/userSchema");
// const Cart = require("../schema/cartSchema");
// const Order = require("../schema/ordersSchema");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

const router = express.Router();

router.route("/").get(authorizationMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.id);

    if (!user) return res.sendStatus(404);

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.route("/").put(authorizationMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.id);

    if (!user) return res.sendStatus(404);

    const isAuthenticatd = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isAuthenticatd) {
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

      const updatedUser = await user.save();

      return res.send(updatedUser).status(200);
    }

    return res.send(user).status(401);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.route("/").delete(authorizationMiddleware, async (req, res) => {
  try {
    const isDeleted = await User.findByIdAndDelete(req.id);

    if (!isDeleted) return res.sendStatus(400);
    // const cart = await Cart.deleteMany({ customerId: req.params.id });
    // const orders = await Order.deleteMany({ customerId: req.params.id });
    res.status(200).send({});
    // res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500).send(error.message);
  }
});

module.exports = router;
