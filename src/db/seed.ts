import { hash } from "bcrypt";
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
    name: "<name>",
    password: await hash("<password>", 10),
    email: "<email_address>",
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
