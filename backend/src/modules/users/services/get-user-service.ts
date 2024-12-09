import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { roles, users } from "../../../db/schema";
import { uuidSchema } from "../../../lib/uuid-schema";

type User = typeof users.$inferSelect;

export interface UserWithPermissions
  extends Omit<User, "password" | "createdAt" | "roleId"> {
  role: string | null;
  permissions: string[];
}

export class GetUserService {
  async execute(userId: unknown) {
    const parsedUserId = uuidSchema.parse(userId);
    const rows = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: roles.name,
        permissions: roles.permissions
      })
      .from(users)
      .innerJoin(roles, eq(users.roleId, roles.id))
      .where(eq(users.id, parsedUserId));
    return rows[0];
  }
}
