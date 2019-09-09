import * as express from 'express';
import jwt from 'express-jwt';

import { keys } from '../config/keys';
import * as controller from '../controllers/user';

export const userRouter = express.Router();

/** GET /api/users */
userRouter.route('/').get(controller.find);

/** GET /api/users/:userId */
/** Authenticated route */
userRouter
  .route('/:userId')
  .get(jwt({ secret: keys.secret }), controller.get);

/** POST /api/users */
userRouter.route('/').post(controller.create);

/** PATCH /api/users/:userId */
/** Authenticated route */
userRouter
  .route('/:userId')
  .patch(jwt({ secret: keys.secret }), controller.patch);
