const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('services/passport');

const ProjectsControllers = require('controllers/project');
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/')
  .post(passportJWT,
  // validateBody(schemas.postSchema),
  ProjectsControllers.upload.single('projectImage'),
  ProjectsControllers.createPost);

module.exports = router;
