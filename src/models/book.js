const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 2,
    },
    author: {
      type: String,
      required: false,
      minlength: 2,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  { collection: "books" }
);
module.exports = mongoose.model("book", bookSchema);
