const router = require('express-promise-router')();
const passport = require('passport');
const UsersController = require('controllers/user');
const jwt = require('express-jwt');
const { JWT_SECRET } = require('config/keys');

const { validateBody, schemas } = require('validations/validations');
const passportSignIn = passport.authenticate('local', {session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/signup')
  .post(UsersController.upload.single('profile_image'),
    UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.signInSchema), passportSignIn, UsersController.signIn);

router.route('/:userId')
  .patch(jwt({ secret: JWT_SECRET }), UsersController.patch);

router.route('/secret')
  .get(passportJWT, UsersController.secret);

module.exports = router;
