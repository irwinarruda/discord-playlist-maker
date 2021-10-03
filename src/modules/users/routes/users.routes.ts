import { Router } from 'express';

import { createUserController } from '../useCases/createUser';

const usersRouter = Router();

usersRouter.post('/', createUserController.create);

export { usersRouter };
