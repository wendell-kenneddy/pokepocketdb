import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { users } from "../../../db/schema";
import { uuidSchema } from "../../../lib/uuid-schema";

export class DeleteUserService {
  async execute(userId: unknown) {
    const parsedUserId = uuidSchema.parse(userId);
    await db.delete(users).where(eq(users.id, parsedUserId));
  }
}
