import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { expansions } from "../../../db/schema";
import { uuidSchema } from "../../../lib/uuid-schema";

export class GetExpansionService {
  async execute(id: unknown) {
    const validatedId = uuidSchema.parse(id);
    const result = await db
      .select()
      .from(expansions)
      .where(eq(expansions.id, validatedId));
    return result[0];
  }
}
