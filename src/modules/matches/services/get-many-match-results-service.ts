import z from "zod";
import { db } from "../../../db";
import { matchResults } from "../../../db/schema";

const getManyMatchResultsSchema = z.object({
  limit: z.coerce.number(),
  page: z.coerce.number()
});

type MatchResult = typeof matchResults.$inferSelect;
export type MatchResultsPage = Pick<
  MatchResult,
  | "id"
  | "winnerName"
  | "winnerEnergies"
  | "loserName"
  | "loserEnergies"
  | "loserConcede"
>;

export class GetManyMatchResultsServie {
  async execute(data: unknown): Promise<MatchResultsPage[]> {
    const { limit, page } = getManyMatchResultsSchema.parse(data);
    const rows = await db
      .select({
        id: matchResults.id,
        winnerName: matchResults.winnerName,
        winnerEnergies: matchResults.winnerEnergies,
        loserName: matchResults.loserName,
        loserEnergies: matchResults.loserEnergies,
        loserConcede: matchResults.loserConcede
      })
      .from(matchResults)
      .limit(limit)
      .offset(limit * (page - 1));
    return rows;
  }
}
