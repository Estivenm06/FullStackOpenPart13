const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInteface }) => {
    await queryInteface.addColumn("users", "disabled", {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },
  down: async ({ context: queryInteface }) => {
    await queryInteface.dropColumn("disabled");
  },
};
