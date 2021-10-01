import { container } from 'tsyringe';

import { TypeOrmUsersRepository } from 'modules/users/repositories/implementations/TypeOrmUsersRepository';
import { IUsersRepository } from 'modules/users/repositories/IUsersRepository';

import { BCryptHashProvider } from 'modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import { IHashProvider } from 'modules/users/providers/HashProvider/models/IHashProvider';

container.registerSingleton<IUsersRepository>(
    'IUsersRepository',
    TypeOrmUsersRepository,
);

container.registerSingleton<IHashProvider>('IHashProvider', BCryptHashProvider);
