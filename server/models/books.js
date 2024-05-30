const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  status: {
    type: String,
    enum: ["à lire", "en cours de lecture", "fini"],
    required: true,
  },
  numberOfPages: { type: Number, required: true },
  category: { type: String, required: true },
  currentPage: { type: Number, default: 0 },
  isFavorite: { type: Boolean, default: false },
  user_id: { type: String, required: true },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
