const Book = require("../models/book");
// const { } = require("./books/funx");

// =====================================
// REQS:
//
// Получить список всех книг.
// Получить книгу по названию.
// Создать книгу по названию.
// Обновить книгу по названию.
// Удалить книгу по названию.
// =====================================

const resData = (data = {}, result = "success", message = "ok") => {
  if (data === null && result !== "error") {
    result = "fail";
    message = "data not found";
  }
  return { result, message, data };
};

const sendError = (res, errorMsg = "Unknown error") => {
  res.status(500).send(resData(null, "error", errorMsg));
};

// =====================================

// Получить список всех пользователей.
const getBooks = (req, res) => {
  Book.find({})
    .then((books) => {
      res.status(200).send(resData(books));
    })
    .catch((e) => sendError(res, e.message));
};

// Получить пользователя по имени.
const getBook = (req, res) => {
  // const { book_id } = req.params;
  const { title } = req.query;

  Book.findOne({ title })
    .then((book) => {
      res.status(200).send(resData(book, `found`));
    })
    .catch((e) => sendError(res, e.message));
};

// Создать пользователя по имени.
const createBook = (req, res) => {
  const bookData = req.body;
  Book.create(bookData)
    .then((book) => {
      res.status(200).send(resData(book, `created`));
    })
    .catch((e) => sendError(res, e.message));
};

// Обновить пользователя по имени.
const updateBook = (req, res) => {
  const { title } = req.query;
  const bookData = req.body;

  Book.findOneAndUpdate({ title }, bookData, { new: true, runValidators: true })
    .then((book) => {
      res.status(200).send(resData(book, `updated`));
    })
    .catch((e) => sendError(res, e.message));
};

// Удалить пользователя по имени.
const deleteBook = (req, res) => {
  const { title } = req.query;

  Book.findOneAndDelete({ title })
    .then((book) => {
      res.status(200).send(resData(book, `deleted`));
    })
    .catch((e) => sendError(res, e.message));
};

module.exports = {
  // Books
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
