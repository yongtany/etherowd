const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy  = require('passport-local').Strategy;

const keys = require('config/keys');
const User = require('models/user');

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: keys.JWT_SECRET
}, async (payload, done) => {
  try {
    // Find the user specified in token
    const user = await User.findById(payload.sub);

    // if user doesn't exists, handle it
    if(!user) {
      return done(null, false);
    }

    // Otherwise, return the user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'publicAddress'
}, async ({publicAddress}, done) => {
  try {
    // Find the user given the publicAddress
    console.log(publicAddress)
    const user = await User.findOne({ "publicAddress": publicAddress });

    // If not, handle it
    if(!user) {
      return done(null, false);
    }

    // Otherwist, return the user
    done(null, user);
    } catch (error) {
      done(error, false);
    }
}));

module.exports = {
   passportSignIn: passport.authenticate('local', {session: false }),
   passportJWT: passport.authenticate('jwt', { session: false }),
}
