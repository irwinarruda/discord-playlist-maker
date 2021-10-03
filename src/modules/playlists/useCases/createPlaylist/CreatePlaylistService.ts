import { injectable, inject } from 'tsyringe';

import { Playlist } from 'modules/playlists/entities/Playlist';
import { IPlaylistsRepository } from 'modules/playlists/repositories/IPlaylistsRepository';
import { AppError } from 'shared/errors/AppError';

interface IRequest {
    name: string;
    userId: number;
}

@injectable()
class CreatePlaylistService {
    constructor(
        @inject('IPlaylistsRepository')
        private playlistRepository: IPlaylistsRepository,
    ) {}

    public async execute({ name, userId }: IRequest): Promise<Playlist> {
        const playlistAlreadyExists = await this.playlistRepository.findByName(
            name,
        );
        if (!playlistAlreadyExists) {
            throw new AppError('Name already taken');
        }
        const playlist = await this.playlistRepository.create({
            name: name,
            created_by: userId,
            owner: userId,
        });
        return playlist;
    }
}

export { CreatePlaylistService };
