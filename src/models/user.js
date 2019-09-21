const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const PROVIDER_ENUM = ['LOCAL', 'FACEBOOK', 'GOOGLE'];

// Create a schema
const userSchema = Schema({
    email: {
      type: String,
      lowercase: true
    },
    username: {
      type: String,
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
    },
    profile_image: {
      type: String
    },
    provider: {
      type: String,
      required: true
    },
    uid: {
      type: String
    }
});

userSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      email: this.email,
      name: this.name,
      username: this.username,
      profile_image: this.profile_image
    };
  },
}


// Create a model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
