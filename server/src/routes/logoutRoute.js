const express = require("express");

const router = express.Router();

router.route("/").delete(async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
    });

    res.end();
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

module.exports = router;
