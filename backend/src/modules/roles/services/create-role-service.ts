import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import { db } from "../../../db";
import { rolePermissionsEnum, roles } from "../../../db/schema";

export const zPermissionsEnum = z.enum(rolePermissionsEnum.enumValues);
const createRoleSchema = createInsertSchema(roles, {
  permissions: zPermissionsEnum
    .array()
    .min(1, "Role must have at least 1 permission.")
});

export class CreateRoleService {
  async execute(data: unknown) {
    const { name, permissions } = createRoleSchema.parse(data);
    const [{ id: roleId }] = await db
      .insert(roles)
      .values({ name, permissions })
      .returning({ id: roles.id });
    return roleId;
  }
}
