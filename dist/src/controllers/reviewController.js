"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = exports.getReviewById = exports.getAllReviews = void 0;
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
const booksModel_1 = __importDefault(require("../models/booksModel"));
const getAllReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield reviewModel_1.default.find();
        res.json(result);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
});
exports.getAllReviews = getAllReviews;
const getReviewById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield reviewModel_1.default.findById(id);
        if (!result) {
            res.status(404).json({ message: "Review not found" });
            return;
        }
        res.json(result);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
});
exports.getReviewById = getReviewById;
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, content, rating, book_id } = req.body;
    if (name === undefined) {
        res.status(400).json({ error: 'Name is required' });
        return;
    }
    if (content === undefined) {
        res.status(400).json({ error: 'Content is required' });
        return;
    }
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        res.status(400).json({ error: 'Rating is required and must be a number between 1 and 5' });
        return;
    }
    if (book_id === undefined) {
        res.status(400).json({ error: 'Book ID is required' });
        return;
    }
    // Check if the book exists before creating a review
    try {
        const result = yield booksModel_1.default.findById(book_id);
        if (!result) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
        return;
    }
    // Create the review if the book exists
    try {
        const result = yield reviewModel_1.default.create({ name, content, rating, book_id });
        res.status(201).json({ message: 'Review created', newReview: { id: result._id, name: name, content: content, rating: rating, book_id: book_id } });
    }
    catch (error) {
        console.error('SERVER ERROR IN CREATEREVIEW:', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
});
exports.createReview = createReview;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, content, rating, bookId } = req.body;
    const updateData = {};
    if (name !== undefined) {
        updateData.name = name;
    }
    if (content !== undefined) {
        updateData.content = content;
    }
    if (rating !== undefined) {
        updateData.rating = rating;
    }
    if (bookId !== undefined) {
        updateData.bookId = bookId;
    }
    if (name === undefined && content === undefined && rating === undefined && bookId === undefined) {
        res.status(400).json({ error: 'At least one field is required' });
        return;
    }
    try {
        const id = req.params.id;
        const result = yield reviewModel_1.default.findByIdAndUpdate(id, updateData, { returnDocument: 'after' });
        if (!result) {
            res.status(404).json({ message: `Review ${id} not found` });
            return;
        }
        res.json({ message: `Review ${id} updated` });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
});
exports.updateReview = updateReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield reviewModel_1.default.findByIdAndDelete(id);
        if (!result) {
            res.status(404).json({ message: `Review ${id} not found` });
            return;
        }
        res.json({ message: `Review ${id} deleted` });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
});
exports.deleteReview = deleteReview;
