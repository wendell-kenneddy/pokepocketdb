import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import { db } from "../../../db";
import {
  matchLoserCards,
  matchResults,
  matchWinnerCards
} from "../../../db/schema";

const matchResultSchema = createInsertSchema(matchResults, {
  winnerEnergies: (s) => z.array(s.winnerEnergies),
  loserEnergies: (s) => z.array(s.loserEnergies)
});
const matchCardSchema = createInsertSchema(matchWinnerCards, {
  matchId: (s) => s.matchId.optional()
});
const createMatchResultSchema = z.object({
  matchResult: matchResultSchema,
  winnerCards: matchCardSchema.array(),
  loserCards: matchCardSchema.array()
});

export class CreateMatchResultService {
  async execute(data: unknown) {
    const { matchResult, winnerCards, loserCards } =
      createMatchResultSchema.parse(data);

    // optimize this abomination

    const matchId = await db.transaction(async (tx) => {
      const [{ id: matchId }] = await tx
        .insert(matchResults)
        .values(matchResult)
        .returning({ id: matchResults.id });

      await tx.insert(matchWinnerCards).values(
        winnerCards.map((c) => ({
          cardId: c.cardId,
          matchId
        }))
      );
      await tx.insert(matchLoserCards).values(
        loserCards.map((c) => ({
          cardId: c.cardId,
          matchId
        }))
      );

      return matchId;
    });

    return matchId;
  }
}
