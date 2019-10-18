const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  projectAddress: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reqeust_image: {
    type: String,
  },
  publishedDate: {
    type: Date,
    default: new Date() // 현재 날짜를 기본값으로
  },
});

requestSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      description: this.description,
      publishedDate: this.publishedDate,
      reqeust_image: this.reqeust_image,
    };
  },
};

requestSchema.statics = {
  createRequest(args, projectAddress, user, reqeust_image) {
    return this.create({
      ...args,
      projectAddress,
      user,
      reqeust_image
    });
  },
};


module.exports = mongoose.model('Request', requestSchema);
