import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { AuthenticateUserService } from './AuthenticateUserService';

class AuthenticateUserController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        const authenticateUserService = container.resolve(
            AuthenticateUserService,
        );
        const { user, token } = await authenticateUserService.execute({
            email,
            password,
        });
        return res.json({ user: classToClass(user), token: token });
    }
}

export { AuthenticateUserController };
