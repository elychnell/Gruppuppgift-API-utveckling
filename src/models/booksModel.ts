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
    type: [String],
    required: true,
  },
  genres: {
    type: String,
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
export default mongoose.model('book', booksSchema);
