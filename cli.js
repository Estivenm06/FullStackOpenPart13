const express = require("express");
require("express-async-errors");
const app = express();
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");
const blogRouter = require("./controllers/blogRouter");
const usersRouter = require("./controllers/usersRouter");
const loginRouter = require("./controllers/loginRouter");
const authorRouter = require("./controllers/authorRouter");
const ReadingListRouter = require("./controllers/readingListRouter");
const logoutRouter = require("./controllers/logoutRouter");

app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/author", authorRouter);
app.use("/api/readinglists", ReadingListRouter);
app.use("/api/logout", logoutRouter);

const start = async () => {
  try {
    connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("An error occurred", error);
  }
};

start();
