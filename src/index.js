const http = require("http");
const getUsers = require("./modules/users");

const hostname = "127.0.0.1";
const port = 3003;

// http://127.0.0.1:3003
// http://127.0.0.1:3003?hello
// http://127.0.0.1:3003?hello=nikita
// http://127.0.0.1:3003?users
// http://127.0.0.1:3003?wrongparam

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${hostname}`);
  const params = Object.fromEntries(url.searchParams);
  // const params = url.searchParams;
  // const params = new URLSearchParams(url.search);
  const prmKeys = Object.keys(params);

  if (prmKeys.length === 0) defaultReq(res);
  else if (prmKeys.length > 1) errorReq(res);
  else {
    switch (prmKeys[0]) {
      case "hello":
        helloReq(res, params);
        break;

      case "users":
        usersReq(res);
        break;

      default:
        errorReq(res);
    }
  }

  console.log(res.statusCode);
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});

// ----------------------------------
//  PATH funx

function helloReq(res, params) {
  const name = params["hello"];
  if (name) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.write(`Hello, ${name}!`);
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.write(`Enter a name`);
  }
}

function usersReq(res) {
  res.status = 200;
  res.statusMessage = "OK";
  res.setHeader("Content-Type", "application/json");
  res.write(getUsers());
}

function defaultReq(res) {
  res.statusCode = 200;
  res.statusMessage = "OK";
  res.setHeader("Content-Type", "text/plain");
  res.write("Hello, World!");
}

function errorReq(res) {
  res.statusCode = 500;
  res.statusMessage = "error";
  // res.setHeader("Content-Type", "text/plain");
  // res.write("");
}
