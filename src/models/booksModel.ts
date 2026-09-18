import mongoose from 'mongoose';
const { Schema } = mongoose;

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

    thumbnail: {
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
export default mongoose.model('book', booksSchema);
