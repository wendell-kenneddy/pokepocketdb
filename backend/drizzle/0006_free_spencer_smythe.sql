ALTER TABLE "cards" DROP CONSTRAINT "cards_name_unique";--> statement-breakpoint
ALTER TABLE "cards" ADD CONSTRAINT "cards_name_expansion_id_unique" UNIQUE("name","expansion_id");