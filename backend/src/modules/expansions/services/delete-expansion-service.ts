import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { expansions } from "../../../db/schema";
import { uuidSchema } from "../../../lib/uuid-schema";

export class DeleteExpansionService {
  async execute(id: unknown) {
    const validatedId = uuidSchema.parse(id);
    await db.delete(expansions).where(eq(expansions.id, validatedId));
  }
}
