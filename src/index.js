const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

const { PORT = 3000, API_URL = "http://localhost" } = process.env;

// const { router } = require("./routes/routes");
// const { logMethodMiddleware } = require("./middlewares/middleware");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb", (err) => {
  if (err) throw err;
  console.log("Connected to MongoDB");
});

const app = express();
app.use(cors);
// app.use(router);
// app.use(logMethodMiddleware);
// app.use(bodyParser.json()); 

// ---------------------

// app.get("/", (request, response) => {
//   response.status(200);
//   response.send(`Hello, ${request.query.hello}!`);
//   response.send(request.body);
// });

// app.get("/users", getUsers);
// app.post("/users", createUser);
// app.patch("/users/:id", updateUser);
// app.delete("/users/:id", deleteUser);

// app.get("/users/:id/photos/:photo_id", (req, res) => {
//   const { id, photo_id } = req.params;
// });

// app.listen(PORT, () => {
//   console.log(`Ссылка на сервер: ${API_URL}:${PORT}`);
// });
