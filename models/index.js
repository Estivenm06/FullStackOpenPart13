const Blog = require("./blogs");
const User = require("./users");
const List = require("./list");
const Active = require("./active");

Blog.belongsTo(User);
User.hasMany(Blog);

User.belongsToMany(Blog, { through: List, as: "readings" });
Blog.belongsToMany(User, { through: List, as: "reading_list" });

Active.belongsTo(User);

module.exports = {
  Blog,
  User,
  List,
  Active
};
