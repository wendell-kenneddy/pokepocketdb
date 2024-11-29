import { desc, eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import { roles, users } from "../../../db/schema";

const pageSchema = z.object({
  limit: z.coerce.number(),
  page: z.coerce.number(),
  ascOrder: z.coerce.boolean()
});

type User = typeof users.$inferSelect;

export interface UserWithRole extends Omit<User, "password" | "createdAt"> {
  role: string | null;
}

export class GetManyUsersService {
  async execute(data: unknown) {
    const { limit, page, ascOrder } = pageSchema.parse(data);
    const rows: UserWithRole[] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: roles.name,
        roleId: users.roleId
      })
      .from(users)
      .innerJoin(roles, eq(users.roleId, roles.id))
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(ascOrder ? users.createdAt : desc(users.createdAt));
    return rows;
  }
}
