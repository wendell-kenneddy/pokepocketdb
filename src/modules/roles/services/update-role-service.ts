import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import { roles } from "../../../db/schema";
import { uuidSchema } from "../../../lib/uuid-schema";
import { zPermissionsEnum } from "./create-role-service";

const updateRoleSchema = z.object({
  roleId: uuidSchema,
  name: z.string(),
  permissions: zPermissionsEnum
    .array()
    .min(1, "Role must have at least 1 permission.")
});

export class UpdateRoleService {
  async execute(data: unknown) {
    const { roleId, name, permissions } = updateRoleSchema.parse(data);
    await db
      .update(roles)
      .set({ name, permissions })
      .where(eq(roles.id, roleId));
  }
}
