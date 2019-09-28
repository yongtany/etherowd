const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('config/keys');
const HTTPStatus = require('http-status');
const multer = require('multer');

const User = require('models/user');
const keys = require('config/keys');

signToken = user => {
  return jwt.sign({
    iss: 'Etherowd',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() +1) // current time + 1 day ahead
  }, JWT_SECRET);
}

const storage = multer.diskStorage({
  // destination: function(req, file, cb) {
  //   cb(null, './uploads/');
  // },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'djs4injum',
  api_key: keys.cloudClientID,
  api_secret: keys.cloudSecret
});

module.exports = {
    upload : multer({
      storage: storage,
      limits : {
        fileSize: 1024 * 1024 * 5
      },
      fileFilter: fileFilter
    }),

    signIn: async(req, res, next) => {
      // Generate token
      const token = signToken(req.user);
      res.status(200).json({user: req.user.toJSON(), token: token});
    },

    signUp: async(req, res, next) => {
      try {
        console.log(req.file.path);
        cloudinary.uploader.upload(req.file.path, async function(result) {
          console.log('hi');
          req.body.profile_image = result.secure_url;
          const { publicAddress, username, profile_image } = req.value.body;
          console.log(publicAddress);
          const foundUser = await User.findOne({ "publicAddress": publicAddress });
          console.log(foundUser);
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
}
