const router = require('express-promise-router')();
const passport = require('passport');
const Uploader = require('services/upload');
const ProjectsControllers = require('controllers/project.controller');
const passportConf = require('services/passport');
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/')
  .post(passportJWT,
  Uploader.upload.single('project_image'),
  ProjectsControllers.createProject);

router.route('/')
  .get(ProjectsControllers.getProjectList);

router.route('/recent')
  .get(ProjectsControllers.getRecentList);

router.route('/:id')
  .get(ProjectsControllers.getProjectByAddress);

router.route('/:id/request')
  .post(
    passportJWT,
    Uploader.upload.single('request_image'),
    ProjectsControllers.requestOnProject);

router.route('/:id/requests')
  .get(
    passportJWT,
    ProjectsControllers.getProjectRequests);

module.exports = router;
