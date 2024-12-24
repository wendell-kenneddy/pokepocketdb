"use server";

import { refetchableRequest } from "@/lib/refetchable-request";

export async function deleteCardAction(cardId: string) {
  try {
    await refetchableRequest(`${process.env.API_URL}/cards?id=${cardId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
}
