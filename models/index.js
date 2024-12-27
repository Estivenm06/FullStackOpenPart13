const Blog = require("./blogs");
const User = require("./users");
const List = require("./list");

Blog.belongsTo(User);
User.hasMany(Blog);

User.belongsToMany(Blog, { through: List, as: "readings" });
Blog.belongsToMany(User, { through: List, as: "reading_list" });

module.exports = {
  Blog,
  User,
  List,
};
