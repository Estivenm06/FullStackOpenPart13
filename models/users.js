const { DataTypes, Model } = require("sequelize");

class User extends Model {}

const { sequelize } = require("../utils/db");

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Validation isEmail on username failed",
        },
      },
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "users",
    timestamps: false,
  }
);

module.exports = User;
