const { DataTypes, Model } = require("sequelize");

class Blog extends Model {}

const { sequelize } = require("../utils/db");

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isWritten(value) {
          if (value < 1991) {
            throw new Error("Year has to be equal or most than 1991");
          }
          const date = new Date()
          if (value > date.getUTCFullYear()) {
            throw new Error("Year is greater than today");
          }
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    tableName: "blogs",
  }
);

module.exports = Blog;
