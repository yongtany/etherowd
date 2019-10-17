const HTTPStatus = require('http-status');
const Reqeust = require('models/request');
const { cloudinary } = require('services/upload');

module.exports = {
  createRequest : async (req, res) => {
    try {
      cloudinary.uploader.upload(req.file.path, async function(result) {
        req.body.request_image = result.secure_url;

        const request = await Reqeust.createRequest(req.body, req.body.request_image);

        return res.status(HTTPStatus.CREATED).json(request);
      });

    } catch(e) {
      return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
  },

  getRequestList : async (req, res) => {
    try {
      const recents = await Reqeust.find()
        .sort({ _id: -1 })
        .limit(10)
        .lean()
        .exec();

        return res.status(HTTPStatus.OK).json(recents);
    } catch(e) {
      return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
  },
}
