const logMethodMiddleware = (request, response, next) => {
  console.log("Request Type:", req.method);
  next();
};

module.exports = { logMethodMiddleware };