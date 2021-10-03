import { getRepository, Repository } from 'typeorm';

import { Playlist } from '../../entities/Playlist';
import { ICreatePlaylistDTO } from '../../dtos/ICreatePlaylistDTO';
import { IPlaylistsRepository } from '../IPlaylistsRepository';

class TypeOrmPlaylistsRepository implements IPlaylistsRepository {
    private ormInstance: Repository<Playlist>;

    constructor() {
        this.ormInstance = getRepository(Playlist);
    }

    public async findById(id: number): Promise<Playlist | undefined> {
        const playlist = this.ormInstance.findOne(id);
        return playlist;
    }

    public async findByName(name: string): Promise<Playlist | undefined> {
        const playlist = await this.ormInstance.findOne({ where: { name } });
        return playlist;
    }

    public async create(data: ICreatePlaylistDTO): Promise<Playlist> {
        const playlist = this.ormInstance.create(data);
        await this.ormInstance.save(playlist);
        return playlist;
    }

    public async save(data: Playlist): Promise<Playlist> {
        await this.ormInstance.save(data);
        return data;
    }
}

export { TypeOrmPlaylistsRepository };
