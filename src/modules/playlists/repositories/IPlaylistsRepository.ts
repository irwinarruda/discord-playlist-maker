import { Playlist } from '../entities/Playlist';
import { ICreatePlaylistDTO } from '../dtos/ICreatePlaylistDTO';

interface IPlaylistsRepository {
    findById(id: number): Promise<Playlist | undefined>;
    findByName(name: string): Promise<Playlist | undefined>;
    create(data: ICreatePlaylistDTO): Promise<Playlist>;
    save(data: Playlist): Promise<Playlist>;
}

export { IPlaylistsRepository };
