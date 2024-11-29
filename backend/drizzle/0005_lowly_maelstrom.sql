ALTER TABLE "cards" ADD CONSTRAINT "cards_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "expansions" ADD CONSTRAINT "expansions_name_unique" UNIQUE("name");