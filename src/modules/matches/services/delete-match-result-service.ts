import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { matchResults } from "../../../db/schema";
import { uuidSchema } from "../../../lib/uuid-schema";

export class DeleteMatchResultService {
  async execute(matchResultId: unknown) {
    const parsedMatcResultId = uuidSchema.parse(matchResultId);
    await db
      .delete(matchResults)
      .where(eq(matchResults.id, parsedMatcResultId));
  }
}
