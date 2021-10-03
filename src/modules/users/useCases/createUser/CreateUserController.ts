import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { CreateUserService } from './CreateUserService';

class CreateUserController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;
        const createUserService = container.resolve(CreateUserService);
        const user = await createUserService.execute({ name, email, password });
        return res.json(classToClass(user));
    }
}

export { CreateUserController };
