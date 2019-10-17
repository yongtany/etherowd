const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
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
  createRequest(args, reqeust_image) {
    return this.create({
      ...args,
      reqeust_image
    });
  },
};


module.exports = mongoose.model('Request', requestSchema);
