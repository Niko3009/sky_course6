const User = require("../models/user");
const Book = require("../models/book");
// const { } = require("./users/funx");

// =====================================
// REQS:
//
// Получить список всех пользователей.
// Получить пользователя по имени.
// Создать пользователя по имени.
// Обновить пользователя по имени.
// Удалить пользователя по имени.
//
// Получить книги пользователя по имени.
// Выдать книгу по названию пользователю по имени.
// Вернуть книгу по названию пользователя по имени.
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

const requiredData = "name username books";

// Получить список всех пользователей.
const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(resData(users));
    })
    .catch((e) => sendError(res, e.message));
};

// Получить пользователя по имени.
const getUser = (req, res) => {
  // const { user_id } = req.params;
  const { name } = req.query;

  User.findOne({ name }, requiredData)
    .then((user) => {
      res.status(200).send(resData(user, `found`));
    })
    .catch((e) => sendError(res, e.message));
};

// Создать пользователя по имени.
const createUser = (req, res) => {
  const userData = req.body;
  User.create(userData)
    .then((user) => {
      res.status(200).send(resData(user, `created`));
    })
    .catch((e) => sendError(res, e.message));
};

// Обновить пользователя по имени.
const updateUser = (req, res) => {
  const { name } = req.query;
  const userData = req.body;

  User.findOneAndUpdate({ name }, userData, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(resData(user, `updated`));
    })
    .catch((e) => sendError(res, e.message));
};

// Удалить пользователя по имени.
const deleteUser = (req, res) => {
  const { name } = req.query;

  User.findOneAndDelete({ name })
    .then((user) => {
      res.status(200).send(resData(user, `deleted`));
    })
    .catch((e) => sendError(res, e.message));
};

// Получить книги пользователя по имени.
const getBooksOfUser = (req, res) => {
  const { name } = req.query;

  User.findOne({ name })
    .then((user) => {
      if (user) res.status(200).send(resData(user.books, `found`));
      else res.status(200).send(resData(null));
    })
    .catch((e) => sendError(res, e.message));
};

// Выдать книгу по названию пользователю по имени.
const addBookOfUser = (req, res) => {
  const { name, title } = req.query;

  Book.findOne({ title })
    .then((book) => {
      if (book) addBook(book);
      else res.status(200).send(resData(null));
    })
    .catch((e) => sendError(res, e.message));

  function addBook(book) {
    User.findOneAndUpdate(
      { name },
      { $addToSet: { books: book } },
      { new: true, runValidators: true }
    )
      .then((user) => {
        res.status(200).send(resData(user, `updated`));
      })
      .catch((e) => sendError(res, e.message));
  }
};

// Вернуть книгу по названию пользователя по имени.
const removeBookOfUser = (req, res) => {
  const { name, title } = req.query;

  Book.findOne({ title })
    .then((book) => {
      if (book) removeBook(book);
      else res.status(200).send(resData(null));
    })
    .catch((e) => sendError(res, e.message));

  function removeBook(book) {
    User.findOneAndUpdate(
      { name },
      { $pull: { books: book } },
      { new: true, runValidators: true }
    )
      .then((user) => {
        res.status(200).send(resData(user, `updated`));
      })
      .catch((e) => sendError(res, e.message));
  }
};

module.exports = {
  // Users
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  // User Books
  getBooksOfUser,
  addBookOfUser,
  removeBookOfUser,
};
