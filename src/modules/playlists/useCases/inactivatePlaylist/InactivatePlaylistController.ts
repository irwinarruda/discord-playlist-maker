import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { InactivatePlaylistService } from './InactivatePlaylistService';

class InactivatePlaylistController {
    public async update(req: Request, res: Response): Promise<Response> {
        const { playlistId } = req.params;
        const { id: userId } = req.user;
        const inactivatePlaylistService = container.resolve(
            InactivatePlaylistService,
        );
        const playlist = await inactivatePlaylistService.execute({
            playlistId: Number(playlistId),
            userId,
        });
        return res.json(playlist);
    }
}

export { InactivatePlaylistController };
