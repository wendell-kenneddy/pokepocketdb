import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { cards } from "../../../db/schema";
import { uuidSchema } from "../../../lib/uuid-schema";

export class DeleteCardService {
  async execute(id: unknown) {
    const validatedId = uuidSchema.parse(id);
    await db.delete(cards).where(eq(cards.id, validatedId));
  }
}
