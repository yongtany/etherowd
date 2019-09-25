const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = Schema({
  nonce: {
    type: Number,
    // default: Math.floor(Math.random() * 10000)
  },
  publicAddress: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  username: {
    type: String,
  },
  profile_image: {
    type: String,
  },
});

userSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      nonce: this.nonce,
      publicAddress: this.publicAddress,
      username: this.username,
      profile_image: this.profile_image
    };
  },
}

// userSchema.pre('save', async function(next) {
//   try {
//     const nonce = Math.floor(Math.random() * 10000);

//     this.nonce = nonce;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

userSchema.pre('init', async function(next) {
  try {
    const nonce = Math.floor(Math.random() * 10000);

    this.nonce = nonce;
    next();
  } catch (error) {
    next(error);
  }
});

// Create a model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
