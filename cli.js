require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const pg = require("pg");
const express = require("express");
const app = express();

app.use(express.json());

const sequelize = new Sequelize(process.env.BACKEND_URL, {
  dialect: "postgres",
  dialectModule: pg,
});

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("You have been successfully connected.");
  } catch (e) {
    console.log(e);
  }
};

main();

app.get("/api/blogs", async (req, res) => {
  try {
    const [blogs] = await sequelize.query("SELECT * from blogs;", {
      type: DataTypes.SELECT,
    });
    res.json(blogs);
  } catch (e) {
    res.status(404).end();
  }
});

app.post("/api/blogs", async (req, res) => {
  try {
    const { author, url, title, likes } = req.body;

    const blog = await sequelize.query(
      `INSERT INTO blogs (author, url, title, likes) values ('${author}', '${url}', '${title}', '${likes}');`)
    res.status(201).json(blog);
  } catch (e) {
    res.status(404).end();
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await sequelize.query(`DELETE FROM blogs WHERE id=${req.params.id};`)
    res.status(200).json(blog);
  } catch (e) {
    res.status(404).end()
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
