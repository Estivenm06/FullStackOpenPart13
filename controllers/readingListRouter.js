const router = require("express").Router();
const { Blog, User, List } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findByPk(body.userId);
    const blog = await Blog.findByPk(body.blogId);
    if (!(user && blog)) {
      return res.status(401).json({ error: "User or blog does not exists." });
    }
    const readingList = await List.create(body);
    return res.json(readingList);
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.put("/:id", tokenExtractor, async (req, res) => {
  try {
    const user = await Blog.findByPk(req.decodedToken.id);
    if (!user) {
      return res.status(401).json({ error: "invalid operation" });
    }
    const blogRead = await List.findByPk(req.params.id);
    blogRead.read = req.body.read;
    blogRead.save();
    return res.json(blogRead);
  } catch (e) {
    return res.status(400).json(e);
  }
});

module.exports = router;
