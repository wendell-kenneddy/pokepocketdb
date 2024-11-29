ALTER TABLE "match_results" RENAME COLUMN "comeback" TO "winner_comeback";--> statement-breakpoint
ALTER TABLE "match_results" RENAME COLUMN "concede" TO "loser_concede";--> statement-breakpoint
ALTER TABLE "match_results" ADD COLUMN "winner_name" text NOT NULL;