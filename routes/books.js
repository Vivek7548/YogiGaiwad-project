const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bookController = require('../controllers/bookController');
const reviewController = require('../controllers/reviewController');

// Book routes
router.post('/', auth, bookController.addBook);
router.get('/', bookController.getBooks);
router.get('/search', bookController.searchBooks);
router.get('/:id', bookController.getBookById);

// Review routes (nested under books)
router.post('/:id/reviews', auth, reviewController.addReview);

module.exports = router;
