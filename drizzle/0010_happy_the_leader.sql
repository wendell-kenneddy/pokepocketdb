ALTER TABLE "match_loser_cards" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "match_winner_cards" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "match_loser_cards" CASCADE;--> statement-breakpoint
DROP TABLE "match_winner_cards" CASCADE;--> statement-breakpoint
ALTER TABLE "match_card" RENAME TO "match_cards";--> statement-breakpoint
ALTER TABLE "match_cards" DROP CONSTRAINT "match_card_match_id_match_results_id_fk";
--> statement-breakpoint
ALTER TABLE "match_cards" DROP CONSTRAINT "match_card_card_id_cards_id_fk";
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
