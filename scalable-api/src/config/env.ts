import 'dotenv/config';
export const env = {
    PORT: Number(process.env.PORT ?? 3000),
    DATABASE_URL: process.env.DATABASE_URL ?? '',
    SWAGGER_TITLE: process.env.SWAGGER_TITLE ?? 'API',
    SWAGGER_VERSION: process.env.SWAGGER_VERSION ?? '1.0.0',
    SWAGGER_DESCRIPTION: process.env.SWAGGER_DESCRIPTION ?? ''
}

if(!env.DATABASE_URL){
    throw new Error('DATABASE_URL environment variable is missing');
}