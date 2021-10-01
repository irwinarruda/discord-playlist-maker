import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';

import { routes } from './routes';
import './container';

import './typeorm';

const app = express();
app.use(express.json());
app.use('/v1', routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
