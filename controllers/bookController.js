const Book = require('../models/Book');
const Review = require('../models/Review');

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, genre, description, publishedYear } = req.body;
    const book = new Book({ title, author, genre, description, publishedYear });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all books with pagination and optional filters
exports.getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    const filter = {};
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = new RegExp(genre, 'i');
    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Book.countDocuments(filter);
    res.json({ books, total });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get book details by ID, including average rating and paginated reviews
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 5 } = req.query;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    const reviews = await Review.find({ book: id })
      .populate('user', 'username')
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const avgRating = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avg: { $avg: '$rating' } } }
    ]);
    res.json({
      book,
      averageRating: avgRating[0]?.avg || 0,
      reviews
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Search books by title or author (partial, case-insensitive)
exports.searchBooks = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: 'Query required' });
    const regex = new RegExp(q, 'i');
    const books = await Book.find({ $or: [ { title: regex }, { author: regex } ] });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
