const Blog = require("./blogs");
const User = require("./users");

Blog.belongsTo(User);
User.hasMany(Blog);

module.exports = { Blog, User };