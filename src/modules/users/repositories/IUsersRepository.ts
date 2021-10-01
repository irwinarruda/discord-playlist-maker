import { User } from '../entities/User';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

interface IUsersRepository {
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: number): Promise<User | undefined>;
    create(data: ICreateUserDTO): Promise<User>;
    save(data: User): Promise<User>;
}

export { IUsersRepository };
