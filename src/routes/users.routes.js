const router = require('express-promise-router')();
const passport = require('passport');
const UsersController = require('controllers/user');
const jwt = require('express-jwt');
const { JWT_SECRET } = require('config/keys');

const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/')
  .get(UsersController.find);

router.route('/:userId')
  .post(jwt({ secret: JWT_SECRET }), UsersController.get);

router.route('/')
  .post(UsersController.create);

router.route('/:userId')
  .patch(jwt({ secret: JWT_SECRET }), UsersController.patch);

router.route('/secret')
  .get(passportJWT, UsersController.secret);

module.exports = router;
