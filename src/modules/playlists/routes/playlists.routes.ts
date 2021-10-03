import { Router } from 'express';

import { createPlaylistController } from '../useCases/createPlaylist';
import { updatePlaylistOwnerController } from '../useCases/updatePlaylistOwner';
import { inactivatePlaylistController } from '../useCases/inactivatePlaylist';

import { ensureAuthenticated } from 'shared/middlewares/ensureAuthenticated';

const playlistRouter = Router();

playlistRouter.post('/', ensureAuthenticated, createPlaylistController.create);
playlistRouter.put(
    '/change_owner/:playlistId',
    ensureAuthenticated,
    updatePlaylistOwnerController.update,
);
playlistRouter.put(
    '/inactivate/:playlistId',
    ensureAuthenticated,
    inactivatePlaylistController.update,
);

export { playlistRouter };
