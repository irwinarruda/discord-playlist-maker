import { injectable, inject } from 'tsyringe';

import { IUsersRepository } from 'modules/users/repositories/IUsersRepository';
import { IHashProvider } from 'modules/users/providers/HashProvider/models/IHashProvider';
import { AppError } from 'shared/errors/AppError';
import { User } from 'modules/users/entities/User';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('IUsersRepository')
        private usersRepository: IUsersRepository,
        @inject('IHashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ email, name, password }: IRequest): Promise<User> {
        const hasUserWithSameEmail = await this.usersRepository.findByEmail(
            email,
        );
        if (hasUserWithSameEmail) {
            throw new AppError('Email already in use');
        }
        const hashedPassword = await this.hashProvider.generateHash(password);
        const user = this.usersRepository.create({
            email,
            name,
            password: hashedPassword,
        });
        return user;
    }
}

export { CreateUserService };
