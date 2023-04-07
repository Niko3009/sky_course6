const { database, mongoose } = require("./setting/dbConnection");
const { app, express } = require("./setting/hostConnection");
const { API } = require("./setting/connectionData");

const { userRouter } = require("./routes/userRoutes");
const { bookRouter } = require("./routes/bookRoutes");

const { mdlwReqTypeLog, mdlwCORSon } = require("./middlewares/middleware");

// ===============================================================

app.use((err, req, res, next) => {
  console.log(err);
});

app.use(mdlwCORSon); // CORS
app.use(mdlwReqTypeLog);

app.use(userRouter);
app.use(bookRouter);

app.get("/", (req, res) => {
  res.status(200).send(`Hello! I'm ${req.originalUrl}!`);
  // res.send(`Hello! I'm ${API}!`);
});

app.get("*", function (req, res) {
  res.status(404).send(`This URL does not exist!`);
});
