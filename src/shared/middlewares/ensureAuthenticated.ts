import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { authConfig } from 'config/auth';
import { AppError } from 'shared/errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new AppError(
            'É necessário se autenticar para acessar este serviço',
        );
    }
    try {
        const [_, token] = authorization.split(' ');
        const { privateKey } = authConfig;
        const decoded = verify(token, privateKey);
        const { sub } = decoded as TokenPayload;
        req.user = { id: Number(sub) };
        return next();
    } catch (err) {
        throw new AppError(
            'É necessário se autenticar para acessar este serviço',
        );
    }
}

export { ensureAuthenticated };
