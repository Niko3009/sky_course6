const router = require("express").Router();

const {
  // Books
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/books");

const URLofBook = "/book";

router.get(URLofBook + "s", getBooks); // Получить список всех книг.
router.get(URLofBook, getBook); // Получить книгу по названию.
router.post(URLofBook, createBook); // Создать книгу по названию.
router.patch(URLofBook, updateBook); // Обновить книгу по названию.
router.delete(URLofBook, deleteBook); // Удалить книгу по названию.

// router.get("/book/:book_id", getBook);

const bookRouter = router;
module.exports = { bookRouter };
