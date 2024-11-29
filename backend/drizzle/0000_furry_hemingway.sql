CREATE TYPE "public"."card_categories" AS ENUM('pokemon', 'item', 'support');--> statement-breakpoint
CREATE TYPE "public"."card_types" AS ENUM('colorless', 'fire', 'water', 'grass', 'fighting', 'metal', 'psychic', 'darkness', 'lightning', 'dragon');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cards" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" "card_categories" NOT NULL,
	"type" "card_types",
	"expansion_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "expansions" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "match_loser_cards" (
	"id" text PRIMARY KEY NOT NULL,
	"match_id" text NOT NULL,
	"card_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "match_results" (
	"id" text PRIMARY KEY NOT NULL,
	"comeback" boolean NOT NULL,
	"concede" boolean NOT NULL,
	"winner_coin_first" boolean NOT NULL,
	"winner_type_advantage" boolean NOT NULL,
	"winner_type_disadvantage" boolean NOT NULL,
	"winnerEnergies" card_types[] NOT NULL,
	"loserEnergies" card_types[] NOT NULL,
	"turns" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "match_winner_cards" (
	"id" text PRIMARY KEY NOT NULL,
	"match_id" text NOT NULL,
	"card_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cards" ADD CONSTRAINT "cards_expansion_id_expansions_id_fk" FOREIGN KEY ("expansion_id") REFERENCES "public"."expansions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_loser_cards" ADD CONSTRAINT "match_loser_cards_match_id_match_results_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."match_results"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_loser_cards" ADD CONSTRAINT "match_loser_cards_card_id_cards_id_fk" FOREIGN KEY ("card_id") REFERENCES "public"."cards"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_winner_cards" ADD CONSTRAINT "match_winner_cards_match_id_match_results_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."match_results"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_winner_cards" ADD CONSTRAINT "match_winner_cards_card_id_cards_id_fk" FOREIGN KEY ("card_id") REFERENCES "public"."cards"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
