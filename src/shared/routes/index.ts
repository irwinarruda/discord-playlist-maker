import { Router } from 'express';

import { usersRouter } from 'modules/users/routes/users.routes';
import { sessionsRouter } from 'modules/users/routes/sessions.routes';
import { playlistRouter } from 'modules/playlists/routes/playlists.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/playlists', playlistRouter);

export { routes };
