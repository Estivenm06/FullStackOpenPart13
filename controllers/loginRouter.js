const router = require("express").Router();
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const user = await User.findOne({
      where: {
        username: body.username,
      },
    });

    const passwordCorrect = body.password === "secret";

    if (!(user && passwordCorrect)) {
      res.status(400).send({ error: "Username or password incorrect" });
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, SECRET);

    res.json({ token, username: user.username, user: user.name });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
