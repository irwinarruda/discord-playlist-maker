import { injectable, inject } from 'tsyringe';

import { IPlaylistsRepository } from 'modules/playlists/repositories/IPlaylistsRepository';
import { Playlist } from 'modules/playlists/entities/Playlist';
import { AppError } from 'shared/errors/AppError';

interface IRequest {
    playlistId: number;
    userId: number;
}

@injectable()
class InactivatePlaylistService {
    constructor(
        @inject('IPlaylistsRepository')
        private playlistRepository: IPlaylistsRepository,
    ) {}

    public async execute({ playlistId, userId }: IRequest): Promise<Playlist> {
        const playlistAlreadyExists = await this.playlistRepository.findById(
            playlistId,
        );
        if (!playlistAlreadyExists) {
            throw new AppError('Playlist does not exists');
        }
        if (playlistAlreadyExists.owner !== userId) {
            throw new AppError('Unable to update playlist');
        }
        const savedPlaylist = { ...playlistAlreadyExists, is_active: false };
        const updatedPlaylist = await this.playlistRepository.save(
            savedPlaylist,
        );
        return updatedPlaylist;
    }
}

export { InactivatePlaylistService };
