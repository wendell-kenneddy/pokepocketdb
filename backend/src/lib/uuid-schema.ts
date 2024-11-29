import z from "zod";

export const uuidSchema = z
  .string()
  .cuid2("Invalid UUID.")
  .trim()
  .min(1, "UUID length too low.");
