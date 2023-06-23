const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../schema/userSchema");

const router = express.Router();

router.use(cookieParser());

router.route("/").post(async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        if (error) return res.sendStatus(403);

        const acessToken = jwt.sign(
          { id: decoded.id.toString() },
          process.env.ACESS_TOKEN_SECRET,
          {
            expiresIn: "15m",
          }
        );

        return res.send({ acessToken: acessToken }).status(200);
      }
    );
  } catch (error) {
    console.log(error.message);
    res.send(error.message).status(500);
  }
});

module.exports = router;
