import type { Express } from 'express';
import { userRouter } from '../module/users/user.routes';

export function registerRoutes(app: Express) {
    app.use('/users', userRouter);
}
