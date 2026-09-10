import mongoose from 'mongoose';
const { Schema } = mongoose;

const booksSchema = new Schema({
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
});

const reviews = new Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  book_id: {
    type: Schema.Types.ObjectId,
    ref: 'book',
    required: false,
  },
});
// export default mongoose.model('users', users)
// export default mongoose.model('books', books)
export default mongoose.model('model', reviews);
