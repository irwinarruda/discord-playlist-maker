import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { CreatePlaylistService } from './CreatePlaylistService';

class CreatePlaylistController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;
        const { id: userId } = req.user;
        const createPlaylistService = container.resolve(CreatePlaylistService);
        const playlist = await createPlaylistService.execute({ name, userId });
        return res.json(classToClass(playlist));
    }
}

export { CreatePlaylistController };
