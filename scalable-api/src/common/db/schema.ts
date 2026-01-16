import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable("users",{
    id:uuid().defaultRandom().primaryKey(),
    name: varchar("name",{length:64}).notNull(),
    email: varchar("email",{length:64}).notNull(),
    phone: varchar("phone",{length:20}).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
});