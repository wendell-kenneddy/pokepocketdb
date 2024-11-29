import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import { expansions } from "../../../db/schema";
import { uuidSchema } from "../../../lib/uuid-schema";

const updateExpansionSchema = z
  .object({
    id: uuidSchema,
    name: z.string().trim().min(1)
  })
  .required();

export class UpdateExpansionService {
  async execute(data: unknown) {
    const { id, name } = updateExpansionSchema.parse(data);
    await db.update(expansions).set({ name }).where(eq(expansions.id, id));
  }
}
