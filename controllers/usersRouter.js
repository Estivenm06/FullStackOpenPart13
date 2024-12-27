const router = require("express").Router();
const { User } = require("../models");
const { Blog } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {
        exclude: ["userId"],
      },
    },
  });
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const where = {};
  if (req.query.read) {
    where.read = req.query.read;
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: [""] },
    include: [
      {
        model: Blog,
        as: "readings",
        attributes: ["id", "url", "title", "author", "likes", "year"],
        through: {
          as: "reading_list",
          attributes: ["id", "read"],
          where,
        },
      },
    ],
  });
  res.json(user);
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: [error.errors[0].message] });
  }
});

router.put("/:username", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    });
    if (user) {
      user.username = req.body.username;
      await user.save();
      return res.json(user);
    } else {
      return res.status(400).send({ error: "User not found" });
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
