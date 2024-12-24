import { and, desc, eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import { matchResults } from "../../../db/schema";

const getManyMatchResultsSchema = z.object({
  winnerName: z
    .string()
    .min(1, "Winner's name must be at least 1 character long.")
    .optional(),
  loserName: z
    .string()
    .min(1, "Loser's name must be at least 1 character long.")
    .optional(),
  turns: z.coerce
    .number()
    .min(1, "Minimum number of turns is 1.")
    .max(30, "Maximum number of turns is 30.")
    .int("Turn count must be an integer.")
    .optional(),
  limit: z.coerce.number(),
  page: z.coerce.number(),
  ascOrder: z.coerce.boolean()
});

type MatchResult = typeof matchResults.$inferSelect;
export type MatchResultsPage = Pick<
  MatchResult,
  | "id"
  | "winnerName"
  | "winnerEnergies"
  | "loserName"
  | "loserEnergies"
  | "turns"
>;

export class GetManyMatchResultsServie {
  async execute(data: unknown): Promise<MatchResultsPage[]> {
    const { winnerName, loserName, turns, limit, page, ascOrder } =
      getManyMatchResultsSchema.parse(data);
    const rows = await db
      .select({
        id: matchResults.id,
        turns: matchResults.turns,
        winnerName: matchResults.winnerName,
        winnerEnergies: matchResults.winnerEnergies,
        loserName: matchResults.loserName,
        loserEnergies: matchResults.loserEnergies
      })
      .from(matchResults)
      .where(
        and(
          winnerName ? eq(matchResults.winnerName, winnerName) : undefined,
          loserName ? eq(matchResults.loserName, loserName) : undefined,
          turns ? eq(matchResults.turns, turns) : undefined
        )
      )
      .limit(limit)
      .offset(limit * (page - 1))
      .orderBy(
        ascOrder ? matchResults.createdAt : desc(matchResults.createdAt)
      );
    return rows;
  }
}
