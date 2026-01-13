CREATE TYPE "public"."user_status" AS ENUM('ACTIVE', 'SUSPENDED');--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"fullName" text NOT NULL,
	"phone" text NOT NULL,
	"country" text NOT NULL,
	"timezone" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE INDEX "User_deletedAt_idx" ON "users" USING btree ("deletedAt");