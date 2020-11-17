const Sequelize = require("sequelize");
const dotenv = require("dotenv");

let URI;

dotenv.config({
  path: "./config.env",
});

if (process.env.NODE_ENV === "production") URI = process.env.DB_URI_PRODUCTION;
if (process.env.NODE_ENV === "test") URI = process.env.DB_URI_TESTING;

const sequelize = new Sequelize(URI, { logging: false });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.persons = require("./personModel")(sequelize, Sequelize);

module.exports = db;
