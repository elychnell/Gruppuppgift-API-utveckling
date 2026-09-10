import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema ({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true
  },
  is_admin: {
    type: Boolean,
    default: false
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('User', userSchema);