const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../schema/userSchema");

const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    const [user] = await User.find({ email: req.body.email });
    const isAuthenticated = bcrypt.match(user.password, req.body.password);

    if (isAuthenticated) {
      res.status(200).send("sucessfully logged in");
    } else {
      res.status(401).send("Authentication Error");
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
