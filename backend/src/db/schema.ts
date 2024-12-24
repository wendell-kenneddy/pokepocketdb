import { createId } from "@paralleldrive/cuid2";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique
} from "drizzle-orm/pg-core";

export const playerAdvantagesEnum = pgEnum("player_advantages", [
  "winner_advantage",
  "loser_advantage",
  "neutral"
]);

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

export const rolePermissionsEnum = pgEnum("role_permissions", [
  "expansions:create",
  "expansions:read",
  "expansions:update",
  "expansions:delete",
  "cards:create",
  "cards:read",
  "cards:update",
  "cards:delete",
  "matches:create",
  "matches:read",
  "matches:update",
  "matches:delete",
  "users:create",
  "users:read",
  "users:update",
  "users:delete",
  "roles:create",
  "roles:read",
  "roles:update",
  "roles:delete"
]);

export const roles = pgTable("roles", {
  id: text("id").primaryKey().$defaultFn(createId),
  name: text("name").unique().notNull(),
  permissions: rolePermissionsEnum("permissions").array().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});

export const users = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(createId),
  email: text("email").unique().notNull(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  roleId: text("role_id")
    .notNull()
    .references(() => roles.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});

export const expansions = pgTable("expansions", {
  id: text("id").primaryKey().$defaultFn(createId),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});

export const cards = pgTable(
  "cards",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    name: text("name").notNull(),
    category: cardCategoriesEnum("category").notNull(),
    type: pokemonTypesEnum("type"),
    expansionId: text("expansion_id")
      .notNull()
      .references(() => expansions.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
  },
  (t) => ({
    unq: unique().on(t.name, t.expansionId)
  })
);

export const matchResults = pgTable("match_results", {
  id: text("id").primaryKey().$defaultFn(createId),
  turns: integer("turns").notNull(),
  winnerComeback: boolean("winner_comeback").notNull(),
  winnerName: text("winner_name").notNull(),
  winnerPoints: integer("winner_points").notNull(),
  winnerCoinFirst: boolean("winner_coin_first").notNull(),
  advantages: playerAdvantagesEnum("advantages").notNull(),
  winnerEnergies: pokemonTypesEnum("winner_energies").array().notNull(),
  winnerLevel: integer("winner_level").notNull(),
  loserLevel: integer("loser_level").notNull(),
  loserName: text("loser_name").notNull(),
  loserConcede: boolean("loser_concede").notNull(),
  loserPoints: integer("loser_points").notNull(),
  loserEnergies: pokemonTypesEnum("loser_energies").array().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});

export const matchCards = pgTable("match_cards", {
  id: text("id").primaryKey().$defaultFn(createId),
  matchId: text("match_id")
    .notNull()
    .references(() => matchResults.id, { onDelete: "cascade" }),
  cardId: text("card_id")
    .notNull()
    .references(() => cards.id, { onDelete: "cascade" }),
  winnerCard: boolean("winner_card").notNull(),
  count: integer("count").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});
