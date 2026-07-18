const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
};
