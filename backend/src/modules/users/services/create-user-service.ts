import { hash } from "bcrypt";
import z from "zod";
import { db } from "../../../db";
import { users } from "../../../db/schema";
import { uuidSchema } from "../../../lib/uuid-schema";

const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "User's name must be at least 3 characters long"),
  email: z.string().email("Invalid e-mail."),
  password: z
    .string()
    .trim()
    .min(5, "Password must be at least 5 characters long."),
  roleId: uuidSchema
});

export class CreateUserService {
  async execute(data: unknown) {
    const { name, email, password, roleId } = userSchema.parse(data);
    const hashedPassword = await hash(password, 10);
    const [{ id: userId }] = await db
      .insert(users)
      .values({ name, email, password: hashedPassword, roleId })
      .returning({ id: users.id });
    return userId;
  }
}
