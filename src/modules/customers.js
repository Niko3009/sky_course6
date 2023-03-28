const fs = require("fs");
const path = require("path");

const getUsers = () => {
  const filePath = path.join(__dirname, "../data/customers.json");
  return JSON.parse(fs.readFileSync(filePath));
};

module.exports = {
  getUsers,
};
