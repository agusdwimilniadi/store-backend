const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

module.exports = {
  rootpath: path.resolve(__dirname, ".."),
  serviceName: process.env.SERVICE_NAME,
  urlDb: process.env.MONGO_URL,
};
