// const User = require("../schema/userSchema");
// const authorizationMiddleware = require("../middleware/authorizationMiddleware");
// const bcrypt = require("bcrypt");
// const express = require("express");

// const router = express.Router();

// router.route("/").put(authorizationMiddleware, async (req, res) => {
//   try {
//     if (!req.body.email || !req.body.password || !req.body.newPassword)
//       return res.status(400);

//     console.log("endpoint hit");

//     const user = await User.findById(req.id);

//     console.log(user);

//     if (!user) return res.status(404);

//     const isAuthenticatd = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );

//     if (isAuthenticatd) {
//       const hashedPassword = await bcrypt.hash(newPassword, 10);

//       const hashedUser = {
//         ...user,
//         password: hashedPassword,
//       };

//       console.log(hashedUser);

//       await hashedUser.save();

//       return res.send(200);
//     }

//     res.status(401);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../schema/userSchema");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

const router = express.Router();

router.route("/").put(authorizationMiddleware, async (req, res) => {
  try {
    if (!req.body.password || !req.body.email || !req.body.newPasssword)
      return res.sendStatus(400);

    const [user] = await User.find({ email: req.body.email });

    if (!user) return res.status(404).end();

    const isAuthenticatd = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isAuthenticatd) {
      const user = await User.findById(req.id);

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

module.exports = router;
