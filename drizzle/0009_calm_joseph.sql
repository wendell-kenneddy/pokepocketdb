ALTER TABLE "cards" DROP CONSTRAINT "cards_expansion_id_expansions_id_fk";
--> statement-breakpoint
ALTER TABLE "match_card" DROP CONSTRAINT "match_card_match_id_match_results_id_fk";
--> statement-breakpoint
ALTER TABLE "match_card" DROP CONSTRAINT "match_card_card_id_cards_id_fk";
--> statement-breakpoint
ALTER TABLE "match_loser_cards" DROP CONSTRAINT "match_loser_cards_match_id_match_results_id_fk";
--> statement-breakpoint
ALTER TABLE "match_loser_cards" DROP CONSTRAINT "match_loser_cards_card_id_cards_id_fk";
--> statement-breakpoint
ALTER TABLE "match_winner_cards" DROP CONSTRAINT "match_winner_cards_match_id_match_results_id_fk";
--> statement-breakpoint
ALTER TABLE "match_winner_cards" DROP CONSTRAINT "match_winner_cards_card_id_cards_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cards" ADD CONSTRAINT "cards_expansion_id_expansions_id_fk" FOREIGN KEY ("expansion_id") REFERENCES "public"."expansions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_card" ADD CONSTRAINT "match_card_match_id_match_results_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."match_results"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_card" ADD CONSTRAINT "match_card_card_id_cards_id_fk" FOREIGN KEY ("card_id") REFERENCES "public"."cards"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_loser_cards" ADD CONSTRAINT "match_loser_cards_match_id_match_results_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."match_results"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_loser_cards" ADD CONSTRAINT "match_loser_cards_card_id_cards_id_fk" FOREIGN KEY ("card_id") REFERENCES "public"."cards"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_winner_cards" ADD CONSTRAINT "match_winner_cards_match_id_match_results_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."match_results"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_winner_cards" ADD CONSTRAINT "match_winner_cards_card_id_cards_id_fk" FOREIGN KEY ("card_id") REFERENCES "public"."cards"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
