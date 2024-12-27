const router = require("express").Router();
const { Blog } = require("../models");
const { User } = require("../models");
const { Op } = require("sequelize");
const {tokenExtractor} = require('../utils/middleware')

router.get("/", async (req, res) => {
  const searchFields = ["author", "title"];

  const searchConditions = [];
  searchFields.forEach((field) => {
    searchConditions.push({
      [field]: {
        [Op.substring]: req.query.search,
      },
    });
  });

  let where = {};

  if (req.query.search) {
    where = {
      [Op.or]: searchConditions,
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
    },
    where,
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
});

router.put("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    const likes = req.body.likes;
    if (!likes && blog) {
      res.status(400).send({ error: "Insert some likes, is empty." });
    } else {
      blog.likes = req.body.likes;
      await blog.save();
      res.json({ blog });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const body = req.body;
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...body, userId: user.id });
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.findByPk(req.params.id);
    if (user.id === blog.userId) {
      await blog.destroy();
      res.json({ Response: "You succesfully deleted this blog." });
    } else {
      res.status(400).json({ error: "You are not the owner of this blog." });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
