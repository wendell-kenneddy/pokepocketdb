import { createInsertSchema } from "drizzle-zod";
import { db } from "../../../db";
import { cards } from "../../../db/schema";

const insertCardSchema = createInsertSchema(cards, {
  name: (s) => s.name.trim().min(3)
});

export class CreateCardService {
  async execute(data: unknown) {
    const { name, category, expansionId, type } = insertCardSchema.parse(data);
    const id = await db
      .insert(cards)
      .values({ name, category, expansionId, type })
      .returning({
        id: cards.id
      });
    return id;
  }
}
