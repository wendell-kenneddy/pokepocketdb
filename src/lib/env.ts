import z from "zod";

const schema = z.object({
  PORT: z.string(),
  ORIGIN: z.string(),
  DATABASE_URL: z.string().url()
});

export const env = schema.parse(process.env);
