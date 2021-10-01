import { Router } from 'express';

import { createUserController } from '../services/createUser';

const usersRouter = Router();

usersRouter.post('/', createUserController.create);

export { usersRouter };
