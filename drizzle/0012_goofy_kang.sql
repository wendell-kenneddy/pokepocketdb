ALTER TABLE "admins" DROP CONSTRAINT "admins_name_unique";--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_email_unique" UNIQUE("email");