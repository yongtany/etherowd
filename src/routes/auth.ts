import * as express from 'express';
import * as controller from '../controllers/auth';

export const authRouter = express.Router();

/** POST /api/users */
authRouter.route('/').post(controller.create);
