import swaggerJSDoc from 'swagger-jsdoc';
import { env } from './env';


export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: env.SWAGGER_TITLE,
            version: env.SWAGGER_VERSION,
            description: env.SWAGGER_DESCRIPTION
        }
    },
    apis: ['src/module/**/*.routes.ts']

})