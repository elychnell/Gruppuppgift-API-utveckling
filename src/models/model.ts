import mongoose from 'mongoose';
const { Schema } = mongoose;

/*
const book = new Schema({
  
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: false,
    default: null
  },
  categories: [category],
  created_at: { 
    type: Date, 
    default: Date.now 
  }
});
*/

const reviews = new Schema({
  
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  review_id: {
    type: Schema.Types.ObjectId,
    ref: 'book',
    required: false
  }

});
// export default mongoose.model('users', users)
// export default mongoose.model('books', books)
export default mongoose.model('model', reviews)