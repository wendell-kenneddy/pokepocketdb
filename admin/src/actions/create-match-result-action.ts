"use server";

import { APIResponse, FullMatchResult } from "@/data/types";
import { ClientError } from "@/errors/client-error";
import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter";
import { refetchableRequest } from "@/lib/refetchable-request";
import { z, ZodError } from "zod";

interface CreateMatchResultFormState {
  message: string;
  errors: string[];
}

interface SubmittableCard {
  cardId: string;
  count: number;
}

const submittableCardSchema = z.object({
  cardId: z.string().cuid2("Invalid card ID."),
  count: z
    .number()
    .min(1, "Count for a single count must be at least 1.")
    .max(2, "Only 2 identical cards can be added.")
    .int("Card count must be an integer."),
});

const createMatchResultSchema = z.object({
  turns: z.coerce
    .number()
    .min(1, "Match must have lasted at least 1 turn.")
    .max(30, "Maximum number of turns is 30.")
    .int("Only integer numbers allowed for turns."),
  advantages: z.string(),
  "winner-coin-first": z
    .string()
    .optional()
    .nullable()
    .transform((x) => !!x),
  "loser-concede": z
    .string()
    .optional()
    .nullable()
    .transform((x) => !!x),
  "winner-comeback": z
    .string()
    .optional()
    .nullable()
    .transform((x) => !!x),
  "winner-name": z.string().min(1, "Winner's name must be at least 1 character long."),
  "winner-level": z.coerce
    .number()
    .min(1, "Winner's level must be at least 1.")
    .max(50, "Winner's max level is 50.")
    .int("Winner's level must be an integer."),
  "winner-points": z.coerce
    .number()
    .min(0, "Winner's points can't be lower than 0.")
    .max(3, "Winner's points can't be greater than 3.")
    .int("Winner's points must be an integer."),
  "winner-energies": z
    .string()
    .transform<string[]>((x) => {
      const array: string[] = JSON.parse(x);
      return array.map((s) => s.replace("winner-energy-", ""));
    })
    .pipe(z.string().array().min(1, "Winner's deck must contain at least 1 energy type.")),
  "winner-deck": z
    .string()
    .transform<SubmittableCard[]>((x) => JSON.parse(x))
    .pipe(
      z
        .array(submittableCardSchema)
        .min(1, "Winner's deck must contain at least 1 card.")
        .max(10, "Winner's deck can't contain more than 20 cards.")
    ),
  "loser-name": z.string().min(1, "Loser's name must be at least 1 character long."),
  "loser-level": z.coerce
    .number()
    .min(1, "Loser's level must be at least 1.")
    .max(50, "Loser's max level is 50.")
    .int("Loser's level must be an integer."),
  "loser-points": z.coerce
    .number()
    .min(0, "Loser's points can't be lower than 0.")
    .max(3, "Loser's points can't be greater than 3.")
    .int("Winner's points must be an integer."),
  "loser-energies": z
    .string()
    .transform<string[]>((x) => {
      const array: string[] = JSON.parse(x);
      return array.map((s) => s.replace("loser-energy-", ""));
    })
    .pipe(z.string().array().min(1, "Winner's deck must contain at least 1 energy type.")),
  "loser-deck": z
    .string()
    .transform<SubmittableCard[]>((x) => JSON.parse(x))
    .pipe(
      z
        .array(submittableCardSchema)
        .min(1, "Winner's deck must contain at least 1 card.")
        .max(10, "Winner's deck can't contain more than 20 cards.")
    ),
});

function kebabCaseToCamelCase(str: string): string {
  return str
    .split("-")
    .map((s, i) => (i > 0 ? capitalizeFirstLetter(s) : s))
    .join("");
}

export async function createMatchResultAction(
  prevState: CreateMatchResultFormState | null,
  formData: FormData
) {
  const state: CreateMatchResultFormState = { message: "", errors: [] };

  try {
    const parsedData = createMatchResultSchema.parse(Object.fromEntries(formData.entries()));
    const camelCasedData: Record<string, any> = {};

    for (const [key, value] of Object.entries(parsedData)) {
      camelCasedData[kebabCaseToCamelCase(key)] = value;
    }

    const { winnerDeck, loserDeck, ...matchResult } = camelCasedData as FullMatchResult;

    const { json } = await refetchableRequest<APIResponse<null>>(`${process.env.API_URL}/matches`, {
      method: "POST",
      body: JSON.stringify({
        matchResult,
        winnerDeck,
        loserDeck,
      }),
    });
    console.log(json);
    if (!json.success) throw new ClientError(json.message, json.errors);
    state.message = json.message;
  } catch (error) {
    if (error instanceof ZodError) {
      state.errors = error.issues.map((issue) => issue.message);
    } else if (error instanceof ClientError) {
      state.errors = error.errors;
    } else {
      state.errors = [(error as unknown as Error).message];
    }
  }

  return state;
}
