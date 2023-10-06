import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../schema/userSchema";

const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    if (!req.body.password || !req.body.email) return res.status(400).end();

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const hashedUser = { ...req.body, password: hashedPassword };

    const user = await User.create(hashedUser);

    const acessToken = jwt.sign(
      { id: user._id.toString() },
      process.env.ACESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id.toString() },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .send({
        user: { ...user._doc, password: req.body.password },
        acessToken: acessToken,
      })
      .status(200);
  } catch (error) {
    res.status(500).send(error).end();
  }
});

module.exports = router;
