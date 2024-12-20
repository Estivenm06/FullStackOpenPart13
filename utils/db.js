const pg = require("pg");
const { Sequelize } = require("sequelize");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
});

const connectToDatabase = async () => {
  try {
    sequelize.authenticate();
    console.log("You have been sucessfully connected to the database.");
  } catch (error) {
    console.log("An error ocurred when trying to connect to the database.");
    return process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectToDatabase,
};
