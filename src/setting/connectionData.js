const dotenv = require("dotenv");

dotenv.config();

const { PORT = 3000, API_URL = "http://localhost" } = process.env;
const API = `${API_URL}:${PORT}`;

const { DB_URL = "http://localhost/db" } = process.env;
const DB = DB_URL;

module.exports = {
  PORT,
  API,
  DB,
};
