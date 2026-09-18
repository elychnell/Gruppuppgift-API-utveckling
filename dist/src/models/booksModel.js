'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const { Schema } = mongoose_1.default;
const booksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genres: {
      type: Array,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    published_year: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);
booksSchema.virtual('reviews', {
  ref: 'review',
  localField: '_id',
  foreignField: 'book_id',
});
exports.default = mongoose_1.default.model('book', booksSchema);
