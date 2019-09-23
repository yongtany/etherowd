const jwt = require('jsonwebtoken');
const User = require('models/user');
const { JWT_SECRET } = require('config/keys');

signToken = user => {
  return jwt.sign({
    iss: 'Etherowd',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() +1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
    find: async (req, res, next) => {
      // If a query string ?publicAddress=... is given, then filter results
      const whereClause = req.query &&
        req.query.publicAddress && {
          where: { publicAddress: req.query.publicAddress }
        };

      return await User.find(whereClause)
        .then(users => res.json(users))
        .catch(next);
    },

    get: async(req, res, next) => {
      // AccessToken payload is in req.user.payload, especially its `id` field
      // UserId is the param in /users/:userId
      // We only allow user accessing herself, i.e. require payload.id==userId
      if ((req).user.payload.id !== +req.params.userId) {
        return res.status(401).send({ error: 'You can can only access yourself' });
      }
      return await User.findById(req.params.userId)
        .then(user => res.json(user))
        .catch(next);
    },

    create: async(req, res, next) => {
      await User.create(req.body)
      .then((user) => res.json(user))
      .catch(next);
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
