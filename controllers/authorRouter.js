const router = require("express").Router();
const { Op } = require("sequelize");
const { Blog } = require("../models");
const { sequelize } = require("../utils/db");

router.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    group: ["author"],
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("author")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    order: [["likes", "DESC"]],
  });
  res.send(authors);
});

module.exports = router;
