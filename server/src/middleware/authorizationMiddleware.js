const jwt = require("jsonwebtoken");

function authorizeAcess(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (error, decoded) => {
    if (error) return res.sendStatus(403);

    req.id = decoded.id;
  });

  next();
}

module.exports = authorizeAcess;
