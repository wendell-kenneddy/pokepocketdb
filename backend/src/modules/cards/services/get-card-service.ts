import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { cards } from "../../../db/schema";
import { uuidSchema } from "../../../lib/uuid-schema";

export class GetCardService {
  async execute(id: unknown) {
    const validatedId = uuidSchema.parse(id);
    const rows = await db.select().from(cards).where(eq(cards.id, validatedId));
    return rows[0];
  }
}
