import { and, eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import {
  cardCategoriesEnum,
  cards,
  pokemonTypesEnum
} from "../../../db/schema";

const getManyCardsSchema = z.object({
  type: z.enum(pokemonTypesEnum.enumValues).optional(),
  category: z.enum(cardCategoriesEnum.enumValues).optional(),
  expansionId: z.string().uuid().optional(),
  limit: z.coerce.number(),
  page: z.coerce.number()
});

export class GetManyCardsService {
  async execute(data: unknown) {
    const { type, category, expansionId, limit, page } =
      getManyCardsSchema.parse(data);

    const rows = await db
      .select()
      .from(cards)
      .where(
        and(
          category ? eq(cards.category, category) : undefined,
          expansionId ? eq(cards.expansionId, expansionId) : undefined,
          type ? eq(cards.type, type) : undefined
        )
      )
      .offset((page - 1) * limit)
      .limit(limit);
    return rows;
  }
}
