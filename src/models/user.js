const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    lastName: {
      type: String,
      required: false,
      minlength: 2,
    },
    username: {
      type: String,
      required: true,
      minlength: 5,
    },
    books: {
      type: [{ type: mongoose.Schema.Types.Mixed, ref: "book" }],
      default: [],
    },
  },
  { collection: "users" }
);
module.exports = mongoose.model("user", userSchema);
