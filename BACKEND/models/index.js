const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

const sequelize = new Sequelize(process.env.DB_URI, { logging: false });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.persons = require("./personModel")(sequelize, Sequelize)

module.exports = db;