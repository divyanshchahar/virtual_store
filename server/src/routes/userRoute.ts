import bcrypt from "bcrypt";
import express from "express";
import User from "../schema/userSchema";

const authorizationMiddleware = require("../middleware/authorizationMiddleware");

const router = express.Router();

router.route("/").get(authorizationMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.id);

    if (!user) return res.status(404);

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/").put(authorizationMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.id);

    if (!user) return res.status(404);

    const isAuthenticatd = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isAuthenticatd) {
      user.name = req?.body?.name;
      user.email = req?.body?.email;
      user.password = await bcrypt.hash(req?.body?.password, 10);

      user.address.house = req?.body?.address?.house;
      user.address.street = req?.body?.address?.street;
      user.address.city = req?.body?.address?.city;
      user.address.pin = req?.body?.address?.pin;
      user.address.country = req?.body?.address?.country;

      user.payments.nameOnCard = req?.body?.payments?.nameOnCard;
      user.payments.cardNo = req?.body?.payments?.cardNo;
      user.payments.validFrom = req?.body?.payments?.validFrom;
      user.payments.validUpto = req?.body?.payments?.validUpto;
      user.payments.cvv = req?.body?.payments?.cvv;

      const updatedUser = await user.save();

      return res.send(updatedUser).status(200).end();
    }

    return res.send(user).status(401).end();
  } catch (error) {
    return res.status(500).send(error).end();
  }
});

router.route("/").delete(authorizationMiddleware, async (req, res) => {
  try {
    const isDeleted = await User.findByIdAndDelete(req.id);

    if (!isDeleted) return res.status(400).end();
    res.status(200).send({}).end();
  } catch (error) {
    res.status(500).send(error).end;
  }
});

module.exports = router;
