import { hash, compare } from 'bcryptjs';
import { IHashProvider } from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
    public async generateHash(payload: string): Promise<string> {
        const hashPassword = await hash(payload, 8);
        return hashPassword;
    }
    public async compareHash(
        payload: string,
        hashed: string,
    ): Promise<boolean> {
        const isHashValid = await compare(payload, hashed);
        return isHashValid;
    }
}

export { BCryptHashProvider };
