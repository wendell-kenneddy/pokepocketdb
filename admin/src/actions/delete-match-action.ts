"use server";

import { refetchableRequest } from "@/lib/refetchable-request";

export async function deleteMatchAction(matchId: string) {
  try {
    const { json } = await refetchableRequest(`${process.env.API_URL}/matches?id=${matchId}`, {
      method: "DELETE",
    });
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}
