const Blog = require("./blogs");
const User = require("./users");

Blog.belongsTo(User);
User.hasMany(Blog);

Blog.sync({ alter: true });
User.sync({ alter: true });

module.exports = { Blog, User };
