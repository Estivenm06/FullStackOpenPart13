const router = require("express").Router();
const { Blog, User, Active } = require("../models");
const { Op } = require("sequelize");
const { tokenExtractor } = require("../utils/middleware");

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

router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    const likes = req.body.likes;
    const user = await User.findByPk(req.decodedToken.id);
    const isActive = await Active.findOne({ where: { userId: user.id } });
    if (user.disabled) {
      return res
        .status(401)
        .json({ error: "This user is currently unavailable." });
    } else {
      if (!isActive) {
        return res.status(401).json({ error: "This user is not logged." });
      }
      if (!likes && blog) {
        return res.status(400).send({ error: "Insert some likes, is empty." });
      } else {
        blog.likes = req.body.likes;
        await blog.save();
        return res.json({ blog });
      }
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
    const isActive = await Active.findOne({ where: { userId: user.id } });
    if (user.disabled) {
      return res
        .status(401)
        .json({ error: "This user is currently unavailable." });
    } else {
      if (!isActive) {
        return res.status(401).json({ error: "This user is not logged." });
      }
      return res.status(201).json(blog);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.findByPk(req.params.id);
    const isActive = await Active.findOne({ where: { userId: user.id } });
    if (user.disabled) {
      return res
        .status(401)
        .json({ error: "This user is currently unavailable." });
    } else {
      if (!isActive) {
        return res.status(401).json({ error: "This user is not logged." });
      }
      if (user.id === blog.userId) {
        await blog.destroy();
        return res.json({ Response: "You succesfully deleted this blog." });
      } else {
        return res
          .status(400)
          .json({ error: "You are not the owner of this blog." });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
