"use server";

import { refetchableRequest } from "@/lib/refetchable-request";

export async function deleteExpansionAction(expansionId: string) {
  try {
    await refetchableRequest(`${process.env.API_URL}/expansions?id=${expansionId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
}
