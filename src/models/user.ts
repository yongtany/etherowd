import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema =  new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  nonce: {
    type: Number,
    required: true,
    unique: true
  },
  publicAddress: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String
  }
});

export default mongoose.model('User', UserSchema);
