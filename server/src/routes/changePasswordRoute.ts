import bcrypt from "bcrypt";
import express from "express";
import authorizationMiddleware from "../middleware/authorizationMiddleware";
import { Users } from "../schema/userSchema";

const router = express.Router();

router.route("/").put(authorizationMiddleware, async (req, res) => {
  try {
    if (!req.body.password || !req.body.email || !req.body.newPasssword)
      return res.sendStatus(400);

    const [user] = await Users.find({ email: req.body.email });

    if (!user) return res.status(404).end();

    const isAuthenticatd = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isAuthenticatd) {
      const user = await Users.findById(req.headers.id);

      if (!user) return res.status(404).end();

      const hashedPassword = await bcrypt.hash(req.body.newPasssword, 10);

      user.password = hashedPassword;

      await user.save();

      return res.status(200).end();
    }

    res.status(401).end();
  } catch (error) {
    res.status(500).send(error).end();
  }
});

export default router;
