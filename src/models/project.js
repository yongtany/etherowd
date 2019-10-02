const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  tags: [String],
  publishedDate: {
    type: Date,
    default: new Date() // 현재 날짜를 기본값으로
  },
  projectImage: {
    type: [String],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  favoriteCount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
  }
});

projectSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      body: this.body,
      tags: this.tags,
      projectImage: this.projectImage,
      publishedDate: this.publishedDate,
      user: this.user,
      favoriteCount: this.favoriteCount,
      category: this.category
    };
  },
};

postSchema.statics = {
  createPost(args, user, projectImage) {
    return this.create({
      ...args,
      user,
      projectImage
    });
  },
};


module.exports = mongoose.model('Post', projectSchema);
