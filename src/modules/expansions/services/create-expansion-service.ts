import z from "zod";
import { db } from "../../../db";
import { expansions } from "../../../db/schema";

const expansionSchema = z.object({
  name: z.string()
});

export class CreateExpansionService {
  async execute(data: unknown) {
    const { name } = expansionSchema.parse(data);
    await db.insert(expansions).values({ name });
  }
}
