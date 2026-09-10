import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewsSchema = new Schema({
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
export default mongoose.model('review', reviewsSchema);
