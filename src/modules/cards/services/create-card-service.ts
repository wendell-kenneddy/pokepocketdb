import { createInsertSchema } from "drizzle-zod";
import { db } from "../../../db";
import { cards } from "../../../db/schema";

const insertCardSchema = createInsertSchema(cards);

export class CreateCardService {
  async execute(data: unknown) {
    const { name, category, expansionId, type } = insertCardSchema.parse(data);
    await db.insert(cards).values({ name, category, expansionId, type });
  }
}
