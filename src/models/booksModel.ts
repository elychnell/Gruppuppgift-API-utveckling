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
  ref: 'review', // The name of the model to populate
  localField: '_id', // The field in the books collection that matches the foreign field
  foreignField: 'book_id', // The field in the reviews collection that references the book
});
export default mongoose.model('book', booksSchema);
