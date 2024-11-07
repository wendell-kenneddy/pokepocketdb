import { createId } from "@paralleldrive/cuid2";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp
} from "drizzle-orm/pg-core";

export const pokemonTypesEnum = pgEnum("card_types", [
  "colorless",
  "fire",
  "water",
  "grass",
  "fighting",
  "metal",
  "psychic",
  "darkness",
  "lightning",
  "dragon"
]);

export const cardCategoriesEnum = pgEnum("card_categories", [
  "pokemon",
  "item",
  "support"
]);

export const expansions = pgTable("expansions", {
  id: text("id").primaryKey().$defaultFn(createId),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});

export const cards = pgTable("cards", {
  id: text("id").primaryKey().$defaultFn(createId),
  name: text("name").notNull(),
  category: cardCategoriesEnum().notNull(),
  type: pokemonTypesEnum(),
  expansionId: text("expansion_id")
    .notNull()
    .references(() => expansions.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});

export const matchResults = pgTable("match_results", {
  id: text("id").primaryKey().$defaultFn(createId),
  comeback: boolean("comeback").notNull(),
  concede: boolean("concede").notNull(),
  winnerCoinFirst: boolean("winner_coin_first").notNull(),
  winnerTypeAdvantage: boolean("winner_type_advantage").notNull(),
  winnerTypeDisadvantage: boolean("winner_type_disadvantage").notNull(),
  winnerEnergies: pokemonTypesEnum().array().notNull(),
  loserEnergies: pokemonTypesEnum().array().notNull(),
  turns: integer("turns").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});

export const matchWinnerCards = pgTable("match_winner_cards", {
  id: text("id").primaryKey().$defaultFn(createId),
  matchId: text("match_id")
    .notNull()
    .references(() => matchResults.id),
  cardId: text("card_id")
    .notNull()
    .references(() => cards.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});

export const matchLoserCards = pgTable("match_loser_cards", {
  id: text("id").primaryKey().$defaultFn(createId),
  matchId: text("match_id")
    .notNull()
    .references(() => matchResults.id),
  cardId: text("card_id")
    .notNull()
    .references(() => cards.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});
