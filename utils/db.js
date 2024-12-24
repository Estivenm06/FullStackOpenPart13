const pg = require("pg");
const { Sequelize } = require("sequelize");
const { DATABASE_URL } = require("./config");
const { SequelizeStorage, Umzug } = require("umzug");

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
});

const migrateConf = {
  migrations: {
    glob: "migrations/*.js",
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrateConf)
  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
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
