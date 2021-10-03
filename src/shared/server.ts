import 'reflect-metadata';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';

import { AppError } from './errors/AppError';
import { routes } from './routes';
import './container';

import './typeorm';

const app = express();
app.use(express.json());
app.use('/v1', routes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
