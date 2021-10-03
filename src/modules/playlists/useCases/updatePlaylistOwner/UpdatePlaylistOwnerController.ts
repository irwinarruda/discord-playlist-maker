import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdatePlaylistOwnerService } from './UpdatePlaylistOwnerService';

class UpdatePlaylistOwnerController {
    public async update(req: Request, res: Response): Promise<Response> {
        const { playlistId } = req.params;
        const { updatedOwner } = req.body;
        const { id: userId } = req.user;
        const updatePlaylistOwnerService = container.resolve(
            UpdatePlaylistOwnerService,
        );
        const playlist = await updatePlaylistOwnerService.execute({
            playlistId: Number(playlistId),
            updatedOwner,
            userId,
        });
        return res.json(playlist);
    }
}
export { UpdatePlaylistOwnerController };
