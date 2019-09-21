const router = require('express-promise-router')();
const authController = require('controllers/auth');


/** POST /auth */
router.route('/').post(authController.create);

module.exports = router;
