CREATE TYPE "public"."role_permissions" AS ENUM('expansions:create', 'expansions:read', 'expansions:update', 'expansions:delete', 'cards:create', 'cards:read', 'cards:update', 'cards:delete', 'matches:create', 'matches:read', 'matches:update', 'matches:delete', 'users:create', 'users:read', 'users:update', 'users:delete');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"permissions" role_permissions[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "admins" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "admins_email_unique";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");