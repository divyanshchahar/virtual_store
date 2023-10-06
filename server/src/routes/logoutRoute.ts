import express from "express";

const router = express.Router();

router.route("/").delete(async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
    });

    res.end();
  } catch (error) {
    res.status(500).send(error).end();
  }
});

module.exports = router;
