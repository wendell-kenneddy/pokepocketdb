import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import {
  cardCategoriesEnum,
  cards,
  pokemonTypesEnum
} from "../../../db/schema";
import { uuidSchema } from "../../../lib/uuid-schema";

const updateCardSchema = z.object({
  id: uuidSchema,
  name: z.string().optional(),
  type: z.enum(pokemonTypesEnum.enumValues).optional(),
  category: z.enum(cardCategoriesEnum.enumValues).optional(),
  expansionId: uuidSchema.optional()
});

export class UpdateCardService {
  async execute(data: unknown) {
    const { id, name, type, category, expansionId } =
      updateCardSchema.parse(data);

    await db
      .update(cards)
      .set({
        name,
        type,
        category,
        expansionId
      })
      .where(eq(cards.id, id));
  }
}
