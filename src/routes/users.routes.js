const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('services/passport');
const UsersController = require('controllers/user');

const passportSignIn = passport.authenticate('local', {session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/signup')
  .post(UsersController.signUp);

router.route('/signin')
  .post(passportSignIn, UsersController.signIn);

router.route('/secret')
  .get(passportJWT, UsersController.secret);

module.exports = router;
