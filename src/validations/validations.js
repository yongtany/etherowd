const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    signUpSchema: Joi.object().keys({
      username: Joi.string().required(),
      profile_image: Joi.string(),
      publicAddress: Joi.string().required()
    }),
    signInSchema: Joi.object().keys({
      publicAddress: Joi.string().required()
    }),
  }
}
