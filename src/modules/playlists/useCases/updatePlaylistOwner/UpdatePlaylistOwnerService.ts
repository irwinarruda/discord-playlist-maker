import { inject, injectable } from 'tsyringe';

import { IPlaylistsRepository } from 'modules/playlists/repositories/IPlaylistsRepository';
import { AppError } from 'shared/errors/AppError';
import { IUsersRepository } from 'modules/users/repositories/IUsersRepository';
import { Playlist } from 'modules/playlists/entities/Playlist';

interface IRequest {
    playlistId: number;
    userId: number;
    updatedOwner: number;
}

@injectable()
class UpdatePlaylistOwnerService {
    constructor(
        @inject('IPlaylistsRepository')
        private playlistRepository: IPlaylistsRepository,
        @inject('IUsersRepository')
        private usersRepository: IUsersRepository,
    ) {}
    public async execute({
        playlistId,
        userId,
        updatedOwner,
    }: IRequest): Promise<Playlist> {
        const userOwnsPlaylist = await this.playlistRepository.findById(
            playlistId,
        );
        if (!userOwnsPlaylist) {
            throw new AppError('Unable to update playlist');
        }
        if (userOwnsPlaylist.owner !== userId) {
            throw new AppError('Unable to update playlist');
        }
        const user = await this.usersRepository.findById(updatedOwner);
        if (!user) {
            throw new AppError('Invalid new Owner');
        }
        const savedPlaylist = { ...userOwnsPlaylist, owner: updatedOwner };
        const updatedPlaylist = await this.playlistRepository.save(
            savedPlaylist,
        );
        return updatedPlaylist;
    }
}

export { UpdatePlaylistOwnerService };
