const HTTPStatus = require('http-status');
const Project = require('models/project');
const Request = require('models/request');
const { cloudinary } = require('services/upload');

module.exports = {
  createProject : async (req, res) => {
    try {
      cloudinary.uploader.upload(req.file.path, async function(result) {
        req.body.project_image = result.secure_url;

        const project = await Project.createProject(req.body, req.user._id, req.body.project_image);

        return res.status(HTTPStatus.CREATED).json(project);
      });

    } catch(e) {
      return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
  },
  getProjectList : async (req, res) => {
    // page가 주어지지 않았다면 1로 간주
    // query는 문자열 형태로 받아 오므로 숫자로 변환
    const page = parseInt(req.query.page || 1, 10);
    const { tag } = req.query;

    const query = tag ? {
      tags: tag, // tags 배열에 tag를 가진 포스트 찾기.
    } : {};

    // 잘못된 페이지가 주어졌다면 에러
    if (page < 1) {
      return res.status(HTTPStatus.BAD_REQUEST).json()
    }

    try {
      const projects = await Project.find(query)
        .sort({ _id: -1 })
        .limit(10)
        .skip((page - 1) * 10)
        .populate('user')
        .lean()
        .exec();

      const projectCount = await Project.count(query).exec();
      const limitBodyLength = project => ({
        ...project,
        body: null
      });

      // 마지막 페이지 알려 주기
      // res.set은 response header를 설정해줍니다.
      res.set('Last-Page', Math.ceil(projectCount / 10));
      return res.status(HTTPStatus.OK).json(projects.map(limitBodyLength));
    } catch (e) {
      return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
  },

  getRecentList : async (req, res) => {
    try {
      const recents = await Project.find()
        .sort({ _id: -1 })
        .limit(4)
        .populate('user')
        .lean()
        .exec();

      const limitBodyLength = project => ({
          ...project,
          body: null
        });

        return res.status(HTTPStatus.OK).json(recents.map(limitBodyLength));
    } catch(e) {
      return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
  },

  getProjectByAddress: async (req, res) => {
    try{
      const address  = req.params.id;
      const project = await Project.findOne({"address": address}).populate('user');

      if(!project) {
        return res.status(HTTPStatus.NOT_FOUND).json();
      }
      return res.status(HTTPStatus.OK).json(project);
    } catch(e) {
      return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
  },

  requestOnProject: async (req, res) => {
    try {
      cloudinary.uploader.upload(req.file.path, async function(result) {
        req.body.request_image = result.secure_url;

        const projectAddress = req.params.id;

        const request = await Request.createRequest(req.body, projectAddress, req.user._id, req.body.request_image);

        const project = await Project.findOneAndUpdate({"address": projectAddress}, { $push: { requests: request }})

        if(!project) {
          return res.status(HTTPStatus.NOT_FOUND).json();
        }

        return res.status(HTTPStatus.OK).json(project);
      });
    } catch(e) {
      return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
  },

  getProjectRequests: async (req, res) => {
    try {
      const address  = req.params.id;

      const requests = await Request.find({projectAddress: address})
        .sort({ _id: -1 })
        .limit(10)
        .populate('user')
        .lean()
        .exec();

      return res.status(HTTPStatus.OK).json(requests);
    } catch(e) {

    }
  }
}
