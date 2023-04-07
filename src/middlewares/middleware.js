const { app, cors } = require("../setting/hostConnection");

const mdlwReqTypeLog = (req, res, next) => {
  console.log();
  console.log(
    req.method,
    `(${time()}) —>`,
    "\n",
    `URL: \x1b[36m${req.originalUrl}\x1b[0m`,
    "\n",
    `path: \x1b[36m${req._parsedUrl.pathname}\x1b[0m`,
    "\n",
    "params:",
    req.query
  );
  next();

  function time() {
    const date = new Date();
    // const dd = String(date.getDate()).padStart(2, "0");
    // const mm = String(date.getMonth() + 1).padStart(2, "0");
    // const yyyy = date.getFullYear();
    // const today = mm + "/" + dd + "/" + yyyy;
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    const now = hh + ":" + mm + ":" + ss;
    return now;
  }
};

const mdlwCORSon = (req, res, next) => {
  app.use(cors());
  // console.log("CORS включен");
  next();
};

module.exports = { mdlwReqTypeLog, mdlwCORSon };
