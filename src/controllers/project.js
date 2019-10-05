const HTTPStatus = require('http-status');
const Post = require('models/project');
const { cloudinary } = require('services/upload');

module.exports = {
  createProject : async (req, res) => {
    try {
      cloudinary.uploader.upload(req.file.path, async function(result) {
        req.body.project_image = result.secure_url;

        const project = await Post.createProject(req.body, req.user._id, req.body.project_image);

        return res.status(HTTPStatus.CREATED).json(project);
      });

    } catch(e) {
      return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
  },
}
