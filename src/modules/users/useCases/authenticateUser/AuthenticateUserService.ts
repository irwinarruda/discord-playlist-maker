import { sign } from 'jsonwebtoken';

import { authConfig } from 'config/auth';

import { IUsersRepository } from 'modules/users/repositories/IUsersRepository';
import { IHashProvider } from 'modules/users/providers/HashProvider/models/IHashProvider';
import { User } from 'modules/users/entities/User';

import { AppError } from 'shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('IUsersRepository')
        private usersRepository: IUsersRepository,
        @inject('IHashProvider')
        private hashProvider: IHashProvider,
    ) {}
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Wrong combination email/password');
        }
        const isPasswordValid = await this.hashProvider.compareHash(
            password,
            user.password,
        );
        if (!isPasswordValid) {
            throw new AppError('Wrong combination email/password');
        }
        const { expiresIn, privateKey } = authConfig;
        const token = sign({}, privateKey, {
            subject: user.id.toString(),
            expiresIn: expiresIn,
        });
        return { user, token };
    }
}

export { AuthenticateUserService };
