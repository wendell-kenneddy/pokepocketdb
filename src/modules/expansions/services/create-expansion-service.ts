import { createInsertSchema } from "drizzle-zod";
import { db } from "../../../db";
import { expansions } from "../../../db/schema";

const createExpansionSchema = createInsertSchema(expansions);

export class CreateExpansionService {
  async execute(data: unknown) {
    const { name } = createExpansionSchema.parse(data);
    await db.insert(expansions).values({ name });
  }
}
