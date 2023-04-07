const mongoose = require("mongoose");

const { DB } = require("./connectionData");

mongoose.connect(DB);
const database = mongoose.connection;
database.once("connected", () => {
  const msg = `Database \x1b[36m${DB}\x1b[0m connected`;
  console.log(msg, `\n`);
});
database.on("error", (error) => {
  console.error(error, `\n`);
});

mongoose.connection.on("error", function (err) {
  log.error("Could not connect to mongo server!");
});

module.exports = {
  database,
  mongoose,
};
