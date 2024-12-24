import { CreateMatchResultForm } from "@/components/create-match-result-form";
import { SelectOption } from "@/components/form-select-control";
import { APIResponse, Card } from "@/data/types";
import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter";
import { refetchableRequest } from "@/lib/refetchable-request";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "pokepocketDB Admin | Insert match result",
};

export default async function CreateMatch() {
  const [types, cards] = await Promise.all([
    refetchableRequest<APIResponse<string[]>>(`${process.env.API_URL}/cards/types`, {
      cache: "force-cache",
      next: {
        tags: ["types:all"],
      },
    }),
    refetchableRequest<APIResponse<Card[]>>(`${process.env.API_URL}/cards?page=1&limit=1000`, {
      cache: "force-cache",
      next: {
        tags: ["cards:all"],
      },
    }),
  ]);
  const pokemonTypesSelectOptions: SelectOption[] = types.json.data.map((t) => ({
    value: t,
    displayValue: capitalizeFirstLetter(t),
  }));

  return (
    <main className="w-[90%] overflow-y-auto max-w-[720px] flex flex-col items-center gap-4 justify-center mx-auto py-4">
      <h2 className="sr-only">Create expansion</h2>

      <CreateMatchResultForm
        pokemonTypes={pokemonTypesSelectOptions}
        availableCards={cards.json.data}
      />
    </main>
  );
}
