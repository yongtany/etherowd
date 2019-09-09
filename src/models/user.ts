import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id: number;
  nonce: number;
  publicAddress: string;
  username: string;
}

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

// Export the model and return your IUser interface
export default mongoose.model<IUser>('User', UserSchema);
