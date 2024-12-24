import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import { db } from "../../../db";
import { matchCards, matchResults, pokemonTypesEnum } from "../../../db/schema";
import { uuidSchema } from "../../../lib/uuid-schema";

const zEnergyEnum = z.enum(pokemonTypesEnum.enumValues);

const matchCardSchema = z.object({
  cardId: uuidSchema,
  count: z
    .number()
    .min(1, "A single card count must be at least 1.")
    .max(2, "A single card can't be used more than twice.")
});

const matchResultSchema = createInsertSchema(matchResults, {
  winnerEnergies: zEnergyEnum
    .array()
    .min(1, "Winner's deck must contain at least 1 energy type."),
  loserEnergies: zEnergyEnum
    .array()
    .min(1, "Loser's deck must contain at least 1 energy type.")
});

const createMatchResultSchema = z.object({
  matchResult: matchResultSchema,
  winnerDeck: matchCardSchema
    .array()
    .min(1, "Winner's deck must contain at least 1 card.")
    .max(10, "A deck can't contain more than 20 cards."),
  loserDeck: matchCardSchema
    .array()
    .min(1, "Loser's deck must contain at least 1 card.")
    .max(10, "A deck can't contain more than 20 cards.")
});

export class CreateMatchResultService {
  async execute(data: unknown) {
    const { matchResult, winnerDeck, loserDeck } =
      createMatchResultSchema.parse(data);

    const matchId = await db.transaction(async (tx) => {
      const [{ id: matchId }] = await tx
        .insert(matchResults)
        .values(matchResult)
        .returning({ id: matchResults.id });
      const cards = [
        ...winnerDeck.map(({ cardId, count }) => ({
          matchId,
          cardId,
          count,
          winnerCard: true
        })),
        ...loserDeck.map(({ cardId, count }) => ({
          matchId,
          cardId,
          count,
          winnerCard: false
        }))
      ];

      await tx.insert(matchCards).values(cards);

      return matchId;
    });

    return matchId;
  }
}
