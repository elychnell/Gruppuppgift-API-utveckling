import mongoose from 'mongoose';
const { Schema } = mongoose;

/*
const category = new Schema({

  name: {
    type: String,
    required: true
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  }
});


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

const bookReview = new Schema({
  
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



export default mongoose.model('bookReview', bookReview)