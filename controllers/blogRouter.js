const router = require("express").Router();
const { Blog } = require("../models");
const jwt = require('jsonwebtoken')
const {SECRET} = require('../utils/config')
const {User} = require('../models')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer')){
    try{
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    }catch{
      res.status(401).json({error: 'token invalid'})
    }
  }else{
    res.json({error: 'token missing'})
  }
  next()
}

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: {exclude: ['userId']},
    include: {
      model: User
    }
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
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...body, userId: user.id});
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.findByPk(req.params.id);
    if(user.id === blog.userId){
      await blog.destroy();
      res.json({Response: 'You succesfully deleted this blog.'})
    }else{
      res.status(400).json({error: 'You are not the owner of this blog.'})
    }
  } catch (error) {
    next(error)
  }
});

module.exports = router;
