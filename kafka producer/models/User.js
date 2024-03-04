import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('users', userSchema);

export default User;
