const express = require("express");
const router = express.Router();
const controller = require("./controller");
const auth = require("./middleware/auth");
const { validateBook } = require("./middleware/validate");

router.post("/addBook", auth, controller.addBook);
router.get("/books", auth, controller.getAllBooks);
router.get("/book/:id", auth, controller.getBookById);
router.get("/book/filter/:filter", auth, controller.getBooksByFilter);
router.put("/book/:id", auth, controller.updateBookStatus);
router.put("/book/status/:id", auth, controller.updateReadingProgress);
router.post("/book/favorite/:id", auth, controller.addBookToFavorites);
router.delete("/book/favorite/:id", auth, controller.removeBookFromFavorites);

// router.post('/reward/:parameter', auth, controller.handleReward);

router.post("/addUser", controller.addUser);
router.get("/user", auth, controller.getUserById);
router.put("/user/:id", auth, controller.updateUserPassword);
router.post("/connexion", controller.loginUser);

module.exports = router;
