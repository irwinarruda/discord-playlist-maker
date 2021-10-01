import { Repository, getRepository } from 'typeorm';
import { IUsersRepository } from '../IUsersRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from 'modules/users/entities/User';

class TypeOrmUsersRepository implements IUsersRepository {
    private ormInstance: Repository<User>;
    constructor() {
        this.ormInstance = getRepository(User);
    }
    public async create(data: ICreateUserDTO): Promise<User> {
        const user = this.ormInstance.create(data);
        await this.ormInstance.save(user);
        return user;
    }

    public async save(data: User): Promise<User> {
        await this.ormInstance.save(data);
        return data;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormInstance.findOne({ where: { email } });
        return user;
    }

    public async findById(id: number): Promise<User | undefined> {
        const user = await this.ormInstance.findOne(id);
        return user;
    }
}

export { TypeOrmUsersRepository };
