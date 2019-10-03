const HTTPStatus = require('http-status');
const Post = require('models/project');
const { cloudinary } = require('services/upload');

module.exports = {
  createPost : async (req, res) => {
    try {
      cloudinary.uploader.upload(req.file.path, async function(result) {
        req.body.projectImage = result.secure_url;

        const post = await Post.createPost(req.body, req.user._id, req.body.postImage);

        return res.status(HTTPStatus.CREATED).json(post);
      });

    } catch(e) {
      return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
  },
}
