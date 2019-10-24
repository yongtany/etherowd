const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('config/keys');
const HTTPStatus = require('http-status');
const User = require('models/user.model');
const { cloudinary } = require('services/upload');

signToken = user => {
  return jwt.sign({
    iss: 'Etherowd',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() +1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
    signIn: async(req, res, next) => {
      try {
        // Generate token
        const { publicAddress } = req.body
        const user = await User.findOne({ "publicAddress": publicAddress });
        // If not, handle it
        if(!user) {
          return done(null, false);
        }

        const token = signToken(user);
        res.status(200).json({user: user.toJSON(), token: token});
      } catch(e) {
        return res.status(HTTPStatus.BAD_REQUEST).json(e);
      }
    },

    signUp: async (req, res) => {
      try {
        cloudinary.uploader.upload(req.file.path, async function(result) {
          req.body.profile_image = result.secure_url;

          const { publicAddress } = req.body;
          const foundUser = await User.findOne({ "publicAddress": publicAddress });
          if(foundUser) {
            return res.status(403).json({ error: 'User is already in use'});
          }

          const newUser = await User.createUser(req.body, req.body.profile_image)

          const token = signToken(newUser);
          // Response with token
          res.status(HTTPStatus.CREATED).json({ newUser, token });
        });
      } catch(e) {
        return res.status(HTTPStatus.BAD_REQUEST).json(e);
      }
    },

    patch:  async(req, res, next) => {
      // Only allow to fetch current user
      if ((req).user.payload.id !== +req.params.userId) {
        return res.status(401).send({ error: 'You can can only access yourself' });
      }
      return await User.findByPk(req.params.userId)
        .then(async user => {
          if (!user) {
            return user;
          }

          Object.assign(user, req.body);
          return user.save();
        })
        .then(user => {
          return user
            ? res.json(user)
            : res.status(401).send({
                error: `User with publicAddress ${
                  req.params.userId
                } is not found in database`
              });
        })
        .catch(next);
    },

    secret: async(req, res, next) => {
        console.log('UsersController.secret() called!');
        res.json({ secret: "resource" });
    },

    getUser: async(req, res, publicAddress) => {
      try {
        const user = await User.findOne({ "publicAddress": publicAddress });

        res.status(HTTPStatus.CREATED).json(user);
      } catch (e) {
        console.log(e);
      }
    }
}
