import { pgTable, serial, text, timestamp, pgEnum, index, varchar } from "drizzle-orm/pg-core";

export const userStatusEnum = pgEnum('user_status',["ACTIVE","SUSPENDED"])
export const users = pgTable("users",{
    id: serial("id").primaryKey(),
    email:text("email").notNull(),
    fullName: text("fullName").notNull(),
    phone:varchar("phone", { length: 20 }).notNull(), // E.164 format: +966501234567
    country:text("country").notNull(),
    timezone:text("timezone"),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
    deletedAt: timestamp("deletedAt"),
},
(table) => ({
    deletedAtIdx: index("User_deletedAt_idx").on(table.deletedAt),
    emailIdx: index("User_email_idx").on(table.email),
    phoneIdx: index("User_phone_idx").on(table.phone),
  }),
)