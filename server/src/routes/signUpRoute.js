const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../schema/userSchema");

const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const hashedUser = { ...req.body, password: hashedPassword };
    const user = await User.create(hashedUser);

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
