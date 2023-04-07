const router = require("express").Router();

const {
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
} = require("../controllers/users");

const URLofUser = "/user";
router.get(URLofUser + "s", getUsers); // Получить список всех пользователей.
router.get(URLofUser, getUser); // Получить пользователя по имени.
router.post(URLofUser, createUser); // Создать пользователя по имени.
router.patch(URLofUser, updateUser); // Обновить пользователя по имени.
router.delete(URLofUser, deleteUser); // Удалить пользователя по имени.

const URLofUserBook = "/user/book";
router.get(URLofUserBook + "s", getBooksOfUser); // Получить книги пользователя по имени.
router.post(URLofUserBook, addBookOfUser); // Выдать книгу по названию пользователю по имени.
router.delete(URLofUserBook, removeBookOfUser); // Вернуть книгу по названию пользователя по имени.

// router.get("/user/:user_id", getUser);

const userRouter = router;
module.exports = { userRouter };
