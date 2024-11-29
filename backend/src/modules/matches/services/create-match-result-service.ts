import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import { db } from "../../../db";
import { matchCards, matchResults, pokemonTypesEnum } from "../../../db/schema";
import { ValidationError } from "../../../errors/validation-error";
import { uuidSchema } from "../../../lib/uuid-schema";

const zEnergyEnum = z.enum(pokemonTypesEnum.enumValues);

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
  winnerDeck: uuidSchema
    .array()
    .min(1, "Winner's deck must contain at least 1 card.")
    .max(20, "A deck can't contain more than 20 cards."),
  loserDeck: uuidSchema
    .array()
    .min(1, "Loser's deck must contain at least 1 card.")
    .max(20, "A deck can't contain more than 20 cards.")
});

export class CreateMatchResultService {
  async execute(data: unknown) {
    const { matchResult, winnerDeck, loserDeck } =
      createMatchResultSchema.parse(data);
    this.validateDecks(winnerDeck, loserDeck);

    const matchId = await db.transaction(async (tx) => {
      const [{ id: matchId }] = await tx
        .insert(matchResults)
        .values(matchResult)
        .returning({ id: matchResults.id });
      const cards = [
        ...winnerDeck.map((cardId) => ({ cardId, matchId, winnerCard: true })),
        ...loserDeck.map((cardId) => ({ cardId, matchId, winnerCard: false }))
      ];

      await tx.insert(matchCards).values(cards);

      return matchId;
    });

    return matchId;
  }

  private validateDecks(winnerDeck: string[], loserDeck: string[]) {
    winnerDeck.reduce<Record<string, number>>((acc, val) => {
      if (acc[val] == 2)
        throw new ValidationError(
          "Winner's deck contain more than two of the same card(s)."
        );
      acc[val] = acc[val] ? acc[val] + 1 : 1;
      return acc;
    }, {});
    loserDeck.reduce<Record<string, number>>((acc, val) => {
      if (acc[val] == 2)
        throw new Error(
          "Winner's deck contain more than two of the same card(s)."
        );
      acc[val] = acc[val] ? acc[val] + 1 : 1;
      return acc;
    }, {});
  }
}
