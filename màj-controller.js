const mongoose = require('mongoose');
const Book = require('./models/books');
const User = require('./models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.addBook = async (req, res) => {
  try {
    const book = new Book({ ...req.body, user: req.user._id });
    await book.save();

    const user = await User.findById(req.user._id);
    user.badges.total_books += 1;

    if (req.body.status === 'fini') {
      user.badges.completed_books += 1;
    }

    updateBadges(user, 'total_books');
    updateBadges(user, 'completed_books');

    await user.save();

    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
};

function updateBadges(user, badgeType) {
  const badgeCount = user.badges[badgeType];
  const badgeList = badgeType === 'total_books' ? user.badges.total_badges : user.badges.completed_badges;

  if (badgeCount === 1 || (badgeCount % 10 === 0 && badgeCount <= 100)) {
    const newBadge = `${badgeType}_${badgeCount}`;
    badgeList.push(newBadge);
  }
}


exports.updateBookStatus = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status: req.body.status },
      { new: true }
    );
    if (!book) {
      return res.status(404).send();
    }

    if (req.body.status === 'fini') {
      const user = await User.findById(req.user._id);
      user.badges.completed_books += 1;
      updateBadges(user, 'completed_books');
      await user.save();
    }

    res.status(200).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
};
