import { desc } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import { matchResults } from "../../../db/schema";

const getManyMatchResultsSchema = z.object({
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
    const { limit, page, ascOrder } = getManyMatchResultsSchema.parse(data);
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
      .limit(limit)
      .offset(limit * (page - 1))
      .orderBy(
        ascOrder ? matchResults.createdAt : desc(matchResults.createdAt)
      );
    return rows;
  }
}
