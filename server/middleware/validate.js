const { check, validationResult } = require('express-validator');

const validateBook = [
  check('title').isString().notEmpty(),
  check('author').isString().notEmpty(),
  check('pages').isInt({ min: 1 }),
  check('category').isString().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateBook };
