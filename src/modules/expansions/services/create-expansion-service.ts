import { createInsertSchema } from "drizzle-zod";
import { db } from "../../../db";
import { expansions } from "../../../db/schema";

const createExpansionSchema = createInsertSchema(expansions, {
  name: (s) => s.name.trim().min(1)
}).required({
  name: true
});

export class CreateExpansionService {
  async execute(data: unknown) {
    const { name } = createExpansionSchema.parse(data);
    const id = await db
      .insert(expansions)
      .values({ name })
      .returning({ id: expansions.id });
    return id;
  }
}
