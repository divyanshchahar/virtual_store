import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { Users } from "../schema/userSchema";

const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    if (!req.body.password || !req.body.email) return res.sendStatus(400);

    const [user] = await Users.find({ email: req.body.email });

    if (!user) return res.status(404);

    const isAuthenticatd = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isAuthenticatd) {
      const acessToken = jwt.sign(
        { id: user._id.toString() },
        process.env.ACESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );

      const refreshToken = jwt.sign(
        { id: user._id.toString() },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .send({ acessToken: acessToken })
        .status(200)
        .end();
    }

    res.status(401).end();
  } catch (error) {
    res.status(500).send(error.message).end();
  }
});

export default router;
