const express = require("express");
const User = require("../schema/userSchema");

const checkJwt = require("../middleware/checkJwt");
const { checkCartScopes } = require("../middleware/checkScopes");

const router = express.Router();

router.route("/").post(checkJwt, checkCartScopes, async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).send(user._id);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.route("/").put(checkJwt, checkCartScopes, async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    Object.entries(req.body).forEach((item) => {
      user[item[0]] = item[1];
    });
    await user.save();
    res.status(200).send("Updated Sucessfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.route("/:id").delete(checkJwt, checkCartScopes, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).send("deleted");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
