"use server";

import { APIResponse, Expansion } from "@/data/types";
import { ClientError } from "@/errors/client-error";
import { refetchableRequest } from "@/lib/refetchable-request";
import { z, ZodError } from "zod";

interface CreateExpansionFormState {
  message: string;
  errors: string[];
}

export async function createExpansionAction(
  prevState: CreateExpansionFormState | null,
  formData: FormData
): Promise<CreateExpansionFormState> {
  const state: CreateExpansionFormState = { message: "", errors: [] };
  const name = formData.get("name");

  try {
    z.string().min(3, "Expansion name must be at least 3 characters long.").parse(name);

    const { json } = await refetchableRequest<APIResponse<Expansion[]>>(
      `${process.env.API_URL}/expansions`,
      {
        method: "POST",
        body: JSON.stringify({ name }),
      }
    );
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
