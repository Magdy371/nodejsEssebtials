import type { Config } from 'drizzle-kit';
import { env } from "./src/config/env.validation";
import { execPath } from 'node:process';

export default {
    schema: "./src/common/database/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: env.DATABASE_URL,
    },
} satisfies Config;