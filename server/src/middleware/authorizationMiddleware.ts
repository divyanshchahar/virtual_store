const jwt = require("jsonwebtoken");

function authorizeAcess(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        res.sendStatus(403);
        return;
      }
      req.id = decoded.id;

      next();
    });
  } catch (error) {
    res.send(error.message).status(500);
  }
}

module.exports = authorizeAcess;
