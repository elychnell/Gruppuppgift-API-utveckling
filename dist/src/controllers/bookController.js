'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteBook =
  exports.updateBook =
  exports.createBook =
  exports.getBookById =
  exports.getAllBooks =
    void 0;
const booksModel_1 = __importDefault(require('../models/booksModel'));
const reviewModel_1 = __importDefault(require('../models/reviewModel'));
// GET /api/books
const getAllBooks = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const result = yield booksModel_1.default.find().populate('reviews');
      res.json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  });
exports.getAllBooks = getAllBooks;
// GET /api/books/:id with populate to get reviews for the specific book
const getBookById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
      const result = yield booksModel_1.default
        .findById(id)
        .populate('reviews');
      if (!result) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }
      res.json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  });
exports.getBookById = getBookById;
// POST /api/books
const createBook = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      console.log('Request body:', req.body); // Log the request body to see what is being sent
      const newBook = yield booksModel_1.default.create(req.body);
      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
exports.createBook = createBook;
// PATCH /api/books/:id
const updateBook = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
      const updatedBook = yield booksModel_1.default.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        },
      );
      if (!updatedBook) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }
      res.json(updatedBook);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  });
exports.updateBook = updateBook;
// DELETE /api/books/:id
const deleteBook = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
      const deletedBook = yield booksModel_1.default.findByIdAndDelete(id);
      if (!deletedBook) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }
      // Delete all reviews together with deleted book
      yield reviewModel_1.default.deleteMany({ book_id: id });
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  });
exports.deleteBook = deleteBook;
