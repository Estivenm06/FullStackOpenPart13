require("dotenv").config();
const { Sequelize } = require("sequelize");
const pg = require('pg')

const sequelize = new Sequelize(process.env.BACKEND_URL, {
    dialect: 'postgres',
    dialectModule: pg
});

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("You have been successfully connected.");
    sequelize.close();
  } catch (error) {
    console.log("Unable to connect to server", error);
  }
};

main();