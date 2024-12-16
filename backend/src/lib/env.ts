import z from "zod";

const schema = z.object({
  PORT: z.string(),
  ORIGIN: z.string(),
  REDIS_URL: z.string().url(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  COOKIE_SECRET: z.string(),
  DATABASE_URL: z.string().url(),
  API_BASE_URL: z.string().url()
});

export const env = schema.parse(process.env);
