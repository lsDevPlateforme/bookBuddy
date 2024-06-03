const Book = require("./models/books");
const User = require("./models/users");
// const Reward = require('./models/rewards');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.addBook = async (req, res) => {
  try {
    const book = new Book({ ...req.body, user_id: req.user._id });
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ user_id: req.user._id });
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user._id });
    if (!book) {
      return res.status(404).send();
    }
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getBooksByFilter = async (req, res) => {
  try {
    const filter = req.params.filter;
    const books = await Book.find({ category: filter, user: req.user._id });
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateBookStatus = async (req, res) => {
  try {
    const bookUpdate = req.body;
    console.log(bookUpdate);
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { bookUpdate },
      { new: true }
    );
    if (!book) {
      return res.status(404).send();
    }
    res.status(200).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateReadingProgress = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { currentPage: req.body.currentPage },
      { new: true }
    );
    if (!book) {
      return res.status(404).send();
    }
    res.status(200).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.addBookToFavorites = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user._id });
    if (!book) {
      return res.status(404).send();
    }
    book.isFavorite = true;
    await book.save();
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.removeBookFromFavorites = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user._id });
    if (!book) {
      return res.status(404).send();
    }
    book.isFavorite = false;
    await book.save();
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send(error);
  }
};

// exports.handleReward = async (req, res) => {

// };

exports.addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    user.password = await bcrypt.hash(user.password, 8);
    await user.save();
    const token = jwt.sign({ _id: user._id }, "votre_secret");
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateUserPassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send();
    }
    user.password = await bcrypt.hash(req.body.password, 8);
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ error: "Authentification invalide" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Authentification invalide" });
    }

    const token = jwt.sign({ _id: user._id }, "votre_secret");
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
};
