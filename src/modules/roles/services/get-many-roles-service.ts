import { desc } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import { roles } from "../../../db/schema";

const pageSchema = z.object({
  limit: z.coerce
    .number()
    .int("Page size must be an integer.")
    .min(1, "Page size must can't be lower than 1.")
    .max(10, "Page size can't be higher than 10."),
  page: z.coerce
    .number()
    .int("Page must be an integer.")
    .min(1, "Page can't be lower than 1."),
  ascOrder: z.coerce.boolean()
});

export class GetManyRolesService {
  async execute(data: unknown) {
    const { limit, page, ascOrder } = pageSchema.parse(data);
    const rows = await db
      .select()
      .from(roles)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(ascOrder ? roles.createdAt : desc(roles.createdAt));
    return rows;
  }
}
