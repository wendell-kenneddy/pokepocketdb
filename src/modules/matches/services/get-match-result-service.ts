import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { matchResults } from "../../../db/schema";
import { uuidSchema } from "../../../lib/uuid-schema";

type MatchResult = typeof matchResults.$inferSelect;

export interface FullMatchResult extends MatchResult {
  matchWinnerCards: { card: { name: string; id: string } }[];
  matchLoserCards: { card: { name: string; id: string } }[];
}

export class GetMatchResultService {
  async execute(matchId: unknown): Promise<FullMatchResult | undefined> {
    const parsedMatchId = uuidSchema.parse(matchId);
    const matchResult = await db.query.matchResults.findFirst({
      where: eq(matchResults.id, parsedMatchId),
      with: {
        matchWinnerCards: {
          with: {
            card: {
              columns: {
                name: true,
                id: true
              }
            }
          }
        },
        matchLoserCards: {
          with: {
            card: {
              columns: {
                name: true,
                id: true
              }
            }
          }
        }
      }
    });
    return matchResult;
  }
}
