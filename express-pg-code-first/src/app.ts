import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRouter from './modules/users/users.routes';
import { setupSwagger } from "./config/swagger";
import { env } from './config/env.validation';

const app = express();
app.use(express.json());

// Fix: Remove the trailing slash, and add /api prefix
app.use("/users", userRouter);

// Setup Swagger first
setupSwagger(app);

// Start server
app.listen(env.PORT, () => {
    console.log(`Server is running on http://localhost:${env.PORT}`);
    console.log(`Swagger docs available at http://localhost:${env.PORT}/docs`);
});