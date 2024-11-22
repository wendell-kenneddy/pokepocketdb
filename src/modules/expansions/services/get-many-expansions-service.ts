import { desc } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import { expansions } from "../../../db/schema";

const querySchema = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
  ascOrder: z.coerce.boolean()
});

export class GetManyExpansionsService {
  async execute(data: unknown) {
    const { page, limit, ascOrder } = querySchema.parse(data);
    const rows = await db
      .select()
      .from(expansions)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(ascOrder ? expansions.createdAt : desc(expansions.createdAt));
    return rows;
  }
}
