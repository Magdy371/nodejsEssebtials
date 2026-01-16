import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '../../config/env';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({connectionString: env.DATABASE_URL});

export const database = drizzle(pool,{schema});
