import cookieParser from "cookie-parser";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.use(cookieParser());

router.route("/").post(async (req, res) => {
  try {
    const refreshToken: string = req.cookies.refreshToken.toString();

    if (!refreshToken) return res.status(401).end();

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        if (error || !decoded || typeof decoded === "string")
          return res.status(403).end();

        const acessToken = jwt.sign(
          { id: decoded.id.toString() },
          process.env.ACESS_TOKEN_SECRET,
          {
            expiresIn: "15m",
          }
        );

        return res.send({ acessToken: acessToken }).status(200).end();
      }
    );
  } catch (error) {
    res.status(500).send(error).end();
  }
});

export default router;
