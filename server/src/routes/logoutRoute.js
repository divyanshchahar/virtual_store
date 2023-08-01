const express = require("express");

const router = express.Router();

router.route("/").delete(async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
    });

    res.end();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
