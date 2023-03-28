const http = require("http");
const {
  getCustomers,
  getCustomer,
  getBooks,
  addBook,
  delBook,
  getTicketStatus,
  updTicketStatus,
} = require("./modules/customers");

const hostname = "127.0.0.1";
const port = 3002;

// http://127.0.0.1:3002/customer?name=Ivan
// http://127.0.0.1:3002/customer/books?name=Ivan

const server = http.createServer((req, res) => {
  requestHandler(req, res);
  res.end();
});
server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});

function requestHandler(req, res) {
  const url = new URL(req.url, `http://${hostname}`);
  const params = Object.fromEntries(url.searchParams);
  const prmKeys = Object.keys(params);
  const path = url.pathname;
  const method = req.method;

  if (path === "/" && prmKeys.length === 0) {
    defaultReq(res);
    return;
  }

  if (path === "/customers") {
    if (method === "GET") getCustomersReq(res);
    return;
  }

  if (path === "/customer") {
    if (method === "GET") getCustomerReq(res, params["name"]);
    return;
  }

  if (path === "/customer/books") {
    if (method === "GET") {
      getBooksReq(res, params["name"]);
      return;
    }
    if (method === "POST") {
      addBookReq(res, params["name"], params["book"]);
      return;
    }
    if (method === "DELETE") {
      delBookReq(res, params["name"], params["book"]);
      return;
    }
  }

  if (path === "/customer/ticket_status") {
    if (method === "GET") {
      getTicketStatusReq(res, params["name"]);
      return;
    }
    if (method === "PATCH") {
      updTicketStatusReq(res, params["name"]);
      return;
    }
  }

  errorReq(res);
}

// ----------------------------------
//  PATH funx

function getCustomersReq(res) {
  res.status = 200;
  res.statusMessage = "OK";
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(getCustomers()));
}
function getCustomerReq(res, name) {
  if (name) {
    res.status = 200;
    res.statusMessage = "OK";
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(getCustomer(name)));
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.write(`Enter a name`);
  }
}

function getBooksReq(res, name) {
  if (name) {
    res.status = 200;
    res.statusMessage = "OK";
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(getBooks(name)));
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.write(`Enter a name`);
  }
}
function addBookReq(res, name, bookTitle) {
  if (name && bookTitle) {
    res.status = 200;
    res.statusMessage = "OK";
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(addBook(name, bookTitle)));
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.write(`Enter a name and book title`);
  }
}
function delBookReq(res, name, bookTitle) {
  if (name && bookTitle) {
    res.status = 200;
    res.statusMessage = "OK";
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(delBook(name, bookTitle)));
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.write(`Enter a name and book title`);
  }
}

function getTicketStatusReq(res, name) {
  if (name) {
    res.status = 200;
    res.statusMessage = "OK";
    res.setHeader("Content-Type", "text/plain");
    res.write(JSON.stringify(getTicketStatus(name)));
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.write(`Enter a name`);
  }
}
function updTicketStatusReq(res, name) {
  if (name) {
    res.status = 200;
    res.statusMessage = "OK";
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(updTicketStatus(name)));
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.write(`Enter a name`);
  }
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
}
