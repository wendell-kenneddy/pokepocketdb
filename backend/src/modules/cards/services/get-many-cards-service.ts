import { and, desc, eq, getTableColumns } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import {
  cardCategoriesEnum,
  cards,
  expansions,
  pokemonTypesEnum
} from "../../../db/schema";
import { uuidSchema } from "../../../lib/uuid-schema";

const getManyCardsSchema = z.object({
  name: z
    .string()
    .min(1, "Card name must be at least 1 character long.")
    .optional(),
  type: z.enum(pokemonTypesEnum.enumValues).optional(),
  category: z.enum(cardCategoriesEnum.enumValues).optional(),
  expansionId: uuidSchema.optional(),
  limit: z.coerce.number(),
  page: z.coerce.number(),
  ascOrder: z.coerce.boolean()
});

export class GetManyCardsService {
  async execute(data: unknown) {
    const { name, type, category, expansionId, limit, page, ascOrder } =
      getManyCardsSchema.parse(data);

    const rows = await db
      .select({
        ...getTableColumns(cards),
        expansion: expansions.name
      })
      .from(cards)
      .innerJoin(expansions, eq(cards.expansionId, expansions.id))
      .where(
        and(
          name ? eq(cards.name, name) : undefined,
          category ? eq(cards.category, category) : undefined,
          expansionId ? eq(cards.expansionId, expansionId) : undefined,
          type ? eq(cards.type, type) : undefined
        )
      )
      .offset((page - 1) * limit)
      .limit(limit)
      .orderBy(ascOrder ? cards.createdAt : desc(cards.createdAt));
    return rows;
  }
}
