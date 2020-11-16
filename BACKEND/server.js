const db = require("./models");
const dotenv = require("dotenv");
const app = require("./app");

db.sequelize.sync();

dotenv.config({
  path: "./config.env",
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on mode ${process.env.NODE_ENV} on port ${port}...`);
});