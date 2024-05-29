const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  badges: {
    total_books: { type: Number, default: 0 },
    completed_books: { type: Number, default: 0 },
    total_badges: [{ type: String }],
    completed_badges: [{ type: String }]
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
