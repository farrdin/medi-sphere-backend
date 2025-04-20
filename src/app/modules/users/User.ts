import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  image: String,
  role: { type: String, default: 'user' },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
