const router = require('express-promise-router')();
const passport = require('passport');
const Uploader = require('services/upload');
const ReqeustControllers = require('controllers/request');
const passportConf = require('services/passport');
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/')
  .post(passportJWT,
  Uploader.upload.single('request_image'),
  ReqeustControllers.createRequest);

router.route('/')
  .get(ReqeustControllers.getRequestList);

module.exports = router;
