import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { roles, users } from "../../../db/schema";
import { uuidSchema } from "../../../lib/uuid-schema";

export class GetUserPermissionsService {
  async execute(userId: unknown) {
    const parsedUserId = uuidSchema.parse(userId);
    const [{ permissions }] = await db
      .select({ permissions: roles.permissions })
      .from(users)
      .innerJoin(roles, eq(users.roleId, roles.id))
      .where(eq(users.id, parsedUserId));
    return permissions;
  }
}
