const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");
const { User } = require(".");

class Active extends Model {}

Active.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "active_sessions",
  }
);

module.exports = Active;
