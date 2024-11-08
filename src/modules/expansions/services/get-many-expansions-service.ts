import { desc } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import { expansions } from "../../../db/schema";

const querySchema = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
  asc: z.coerce.boolean()
});

export class GetManyExpansionsService {
  async execute(data: unknown) {
    const { page, limit, asc } = querySchema.parse(data);
    const rows = await db
      .select()
      .from(expansions)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(asc ? expansions.createdAt : desc(expansions.createdAt));
    return rows;
  }
}
