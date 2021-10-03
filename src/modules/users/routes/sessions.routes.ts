import { Router } from 'express';

import { authenticateUserController } from '../useCases/authenticateUser';

const sessionsRouter = Router();

sessionsRouter.post('/', authenticateUserController.create);

export { sessionsRouter };
