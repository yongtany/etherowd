const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('services/passport');

const { validateBody, schemas } = require('validations/validations');
const UsersController = require('controllers/user');

const passportSignIn = passport.authenticate('local', {session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('googleToken', { session: false });
const passportFacebook = passport.authenticate('facebookToken', { session : false });

router.route('/signup')
  .post(validateBody(schemas.signUpSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.signInSchema), passportSignIn, UsersController.signIn);

router.route('/oauth/google')
  .post(passportGoogle, UsersController.googleOAuth);

router.route('/oauth/facebook')
  .post(passportFacebook, UsersController.facebookOAuth);

router.route('/secret')
  .get(passportJWT, UsersController.secret);

router.route('/contact')
  .post(UsersController.contact);

module.exports = router;
