CREATE TYPE "public"."card_categories" AS ENUM('pokemon', 'item', 'support');--> statement-breakpoint
CREATE TYPE "public"."player_advantages" AS ENUM('winner_advantage', 'loser_advantage', 'neutral');--> statement-breakpoint
CREATE TYPE "public"."card_types" AS ENUM('colorless', 'fire', 'water', 'grass', 'fighting', 'metal', 'psychic', 'darkness', 'lightning', 'dragon');--> statement-breakpoint
CREATE TYPE "public"."role_permissions" AS ENUM('expansions:create', 'expansions:read', 'expansions:update', 'expansions:delete', 'cards:create', 'cards:read', 'cards:update', 'cards:delete', 'matches:create', 'matches:read', 'matches:update', 'matches:delete', 'users:create', 'users:read', 'users:update', 'users:delete', 'roles:create', 'roles:read', 'roles:update', 'roles:delete');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cards" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" "card_categories" NOT NULL,
	"type" "card_types",
	"expansion_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "cards_name_expansion_id_unique" UNIQUE("name","expansion_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "expansions" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "expansions_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "match_cards" (
	"id" text PRIMARY KEY NOT NULL,
	"match_id" text NOT NULL,
	"card_id" text NOT NULL,
	"winner_card" boolean NOT NULL,
	"count" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "match_results" (
	"id" text PRIMARY KEY NOT NULL,
	"turns" integer NOT NULL,
	"winner_comeback" boolean NOT NULL,
	"winner_name" text NOT NULL,
	"winner_points" integer NOT NULL,
	"winner_coin_first" boolean NOT NULL,
	"advantages" "player_advantages" NOT NULL,
	"winner_energies" card_types[] NOT NULL,
	"winner_level" integer NOT NULL,
	"loser_level" integer NOT NULL,
	"loser_name" text NOT NULL,
	"loser_concede" boolean NOT NULL,
	"loser_points" integer NOT NULL,
	"loser_energies" card_types[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"permissions" role_permissions[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"password" text NOT NULL,
	"role_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cards" ADD CONSTRAINT "cards_expansion_id_expansions_id_fk" FOREIGN KEY ("expansion_id") REFERENCES "public"."expansions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_cards" ADD CONSTRAINT "match_cards_match_id_match_results_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."match_results"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_cards" ADD CONSTRAINT "match_cards_card_id_cards_id_fk" FOREIGN KEY ("card_id") REFERENCES "public"."cards"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
