const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const { API, PORT } = require("./connectionData");

const app = express();

app.use(bodyParser.json());
app.listen(PORT, () => {
  const msg = `Ссылка на сервер: \x1b[4m${API}\x1b[0m`;
  console.log(msg, `\n`);
});

module.exports = {
  app,
  cors,
  express,
};
