import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

function authorizeAcess(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (error, decoded) => {
      if (error || !decoded || typeof decoded === "string") {
        res.sendStatus(403);
        return;
      }

      req.headers.id = decoded.id;

      next();
    });
  } catch (error) {
    res.send(error).status(500);
  }
}

export default authorizeAcess;
