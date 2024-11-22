CREATE TABLE IF NOT EXISTS "match_card" (
	"id" text PRIMARY KEY NOT NULL,
	"match_id" text NOT NULL,
	"card_id" text NOT NULL,
	"winner_card" boolean NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_card" ADD CONSTRAINT "match_card_match_id_match_results_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."match_results"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_card" ADD CONSTRAINT "match_card_card_id_cards_id_fk" FOREIGN KEY ("card_id") REFERENCES "public"."cards"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
