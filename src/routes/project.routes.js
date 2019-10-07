const router = require('express-promise-router')();
const passport = require('passport');
const Uploader = require('services/upload');
const ProjectsControllers = require('controllers/project');
const passportConf = require('services/passport');
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/')
  .post(passportJWT,
  Uploader.upload.single('project_image'),
  ProjectsControllers.createProject);

router.route('/')
  .get(ProjectsControllers.getProjectList);

module.exports = router;