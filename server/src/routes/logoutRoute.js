const express = require("express");

const router = express.Router();

router.route("/").put(async (req, res) => {
  try {
    res
      .clearCookie("refreshToken", {
        httpOnly: true,
      })
      .sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

module.exports = router;
