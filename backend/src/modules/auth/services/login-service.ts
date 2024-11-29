import { compare } from "bcrypt";
import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import { users } from "../../../db/schema";
import { AuthenticationError } from "../../../errors/authentication-error";

const loginSchema = z.object({
  email: z.string().email("Invalid e-mail."),
  password: z
    .string()
    .trim()
    .min(5, "Password must be at least 5 characters long.")
});

export class LoginService {
  async execute(data: unknown): Promise<string> {
    const { email, password } = loginSchema.parse(data);
    const rows = await db
      .select({ id: users.id, password: users.password })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (!rows.length) throw new AuthenticationError("User not found.");
    const user = rows[0];
    const authenticated = await compare(password, user.password);
    if (!authenticated) throw new AuthenticationError("Incorrect password.");
    return user.id;
  }
}
