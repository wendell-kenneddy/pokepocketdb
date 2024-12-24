import { eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "../../../db";
import { cards, matchCards, matchResults } from "../../../db/schema";
import { uuidSchema } from "../../../lib/uuid-schema";

type MatchResult = typeof matchResults.$inferSelect;

export interface FullMatchResult extends MatchResult {
  matchWinnerCards: { card: { name: string; id: string } }[];
  matchLoserCards: { card: { name: string; id: string } }[];
}

export class GetMatchResultService {
  async execute(matchId: unknown) {
    const parsedMatchId = uuidSchema.parse(matchId);
    const utilizedCards = db.$with("utilized_cards").as(
      db
        .select({
          cardId: matchCards.cardId,
          cardName: cards.name,
          category: cards.category,
          type: cards.type,
          count: matchCards.count,
          winnerCard: matchCards.winnerCard
        })
        .from(matchCards)
        .innerJoin(cards, eq(matchCards.cardId, cards.id))
        .where(eq(matchCards.matchId, parsedMatchId))
    );
    const winnerDeck = db.$with("winner_cards").as(
      db
        .select({
          deck: sql/*sql*/ `
            JSON_AGG(
              JSON_BUILD_OBJECT(
                'cardId', ${utilizedCards.cardId},
                'cardName', ${utilizedCards.cardName},
                'category', ${utilizedCards.category},
                'type', ${utilizedCards.type},
                'count', ${utilizedCards.count},
                'winnerCard', ${utilizedCards.winnerCard}
              )
            )
          `.as("winner_deck")
        })
        .from(utilizedCards)
        .where(eq(utilizedCards.winnerCard, true))
    );
    const loserDeck = db.$with("loser_cards").as(
      db
        .select({
          deck: sql/*sql*/ `
            JSON_AGG(
              JSON_BUILD_OBJECT(
                'cardId', ${utilizedCards.cardId},
                'cardName', ${utilizedCards.cardName},
                'category', ${utilizedCards.category},
                'type', ${utilizedCards.type},
                'count', ${utilizedCards.count},
                'winnerCard', ${utilizedCards.winnerCard}
              )
            )
          `.as("loser_deck")
        })
        .from(utilizedCards)
        .where(eq(utilizedCards.winnerCard, false))
    );
    const result = await db
      .with(utilizedCards, winnerDeck, loserDeck)
      .select({
        ...getTableColumns(matchResults),
        winnerDeck: sql/*sql*/ `
          (SELECT ${winnerDeck.deck} FROM ${winnerDeck})
        `.as("winner_deck"),
        loserDeck: sql/*sql*/ `
          (SELECT ${loserDeck.deck} FROM ${loserDeck})
        `.as("loser_deck")
      })
      .from(matchResults)
      .where(eq(matchResults.id, parsedMatchId));
    return result[0];
  }
}
