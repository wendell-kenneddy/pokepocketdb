import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { roles } from "../../../db/schema";
import { uuidSchema } from "../../../lib/uuid-schema";

export class DeleteRoleService {
  async execute(data: unknown) {
    const roleId = uuidSchema.parse(data);
    await db.delete(roles).where(eq(roles.id, roleId));
  }
}
