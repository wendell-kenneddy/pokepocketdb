import { genSaltSync, hashSync } from "bcrypt";
import { db } from ".";
import { roles, users } from "./schema";

type RoleInsert = typeof roles.$inferInsert;
type UserInsert = typeof users.$inferInsert;

async function main() {
  const editorRole: RoleInsert = {
    name: "editor",
    permissions: [
      "cards:create",
      "cards:delete",
      "cards:read",
      "cards:update",
      "expansions:create",
      "expansions:delete",
      "expansions:read",
      "expansions:update",
      "matches:create",
      "matches:delete",
      "matches:read",
      "matches:update"
    ]
  };
  const adminRole: RoleInsert = {
    name: "admin",
    permissions: [
      ...editorRole.permissions,
      "users:create",
      "users:delete",
      "users:read",
      "users:update",
      "roles:create",
      "roles:read",
      "roles:update",
      "roles:delete"
    ]
  };
  const admin: UserInsert = {
    name: String(process.env.ADMIN_NAME),
    password: hashSync(String(process.env.ADMIN_PASSWORD), genSaltSync(10)),
    email: String(process.env.ADMIN_EMAIL),
    roleId: ""
  };
  await db.transaction(async (tx) => {
    console.log("[SEED]: creating roles");
    const roleIds = await tx
      .insert(roles)
      .values([editorRole, adminRole])
      .returning({ id: roles.id });
    console.log("[SEED]: creating root user");
    await tx.insert(users).values({ ...admin, roleId: roleIds[1].id });
  });
}

main();
console.log("[SEED]: done");
