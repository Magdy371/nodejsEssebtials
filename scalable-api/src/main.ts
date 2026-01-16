import 'reflect-metadata';
import express from "express";
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env';
import { swaggerSpec } from './config/swagger';
import { registerRoutes } from './config/routes';
import { errorMiddleware } from './common/middleware/error.middleware';

const app = express();
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
registerRoutes(app);

app.use(errorMiddleware);

app.listen(env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    console.log(`📚 Swagger docs on http://localhost:${env.PORT}/docs`);
});
