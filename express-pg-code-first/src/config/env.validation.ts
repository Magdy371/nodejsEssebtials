import { z } from 'zod';

const envSchema = z.object({
    PORT:z.string().default("3000"),
    DATABASE_URL: z.string().default("postgresql://Magdy:cuj40027@localhost:5432/express_db"),
});
export const env = envSchema.parse(process.env)