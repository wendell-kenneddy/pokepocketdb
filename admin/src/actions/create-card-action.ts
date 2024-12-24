"use server";

import { APIResponse } from "@/data/types";
import { ClientError } from "@/errors/client-error";
import { refetchableRequest } from "@/lib/refetchable-request";
import { z, ZodError } from "zod";

interface CreateCardFormState {
  message: string;
  errors: string[];
}

const createCardSchema = z.object({
  name: z.string().min(1, "Card name must be at least 1 character long."),
  category: z.string().min(1, "Card category required."),
  type: z.string().min(1, "Card type required.").nullable(),
  expansionId: z.string().min(1, "Card expansion required."),
});

export async function createCardAction(
  prevState: CreateCardFormState | null,
  formData: FormData
): Promise<CreateCardFormState> {
  const state: CreateCardFormState = { message: "", errors: [] };
  const rawData = {
    name: formData.get("name"),
    category: formData.get("category"),
    type: formData.get("type"),
    expansionId: formData.get("expansion"),
  };

  try {
    const parsedData = createCardSchema.parse(rawData);
    const { json } = await refetchableRequest<APIResponse<{ id: string }>>(
      `${process.env.API_URL}/cards`,
      { method: "POST", body: JSON.stringify(parsedData) }
    );
    if (!json.success) throw new ClientError(json.message, json.errors);
    state.message = json.message;
  } catch (error) {
    console.log(error);

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
