const router = require("express").Router();
const { User, Active } = require("../models");
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
      return res.status(400).send({ error: "Username or password incorrect" });
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, SECRET, {
      expiresIn: 60 * 60,
    });

    const isActive = await Active.findOne({ where: { userId: user.id } });
    if (isActive) {
      return res.status(401).json({ error: "This user is already logged." });
    } else {
      const active = await Active.create({ userId: user.id, active: true });

      if (active) {
        return res.json({
          token,
          username: user.username,
          user: user.name,
          active: true,
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
