import { CreateCardForm } from "@/components/create-card-form";
import { SelectOption } from "@/components/form-select-control";
import { APIResponse, Expansion } from "@/data/types";
import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter";
import { refetchableRequest } from "@/lib/refetchable-request";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "pokepocketDB Admin | Create card",
};

export default async function CreateCard() {
  const [expansions, categories, types] = await Promise.all([
    refetchableRequest<APIResponse<Expansion[]>>(
      `${process.env.API_URL}/expansions?page=1&limit=50`,
      {
        cache: "force-cache",
        next: {
          tags: ["expansions:all"],
        },
      }
    ),
    refetchableRequest<APIResponse<string[]>>(`${process.env.API_URL}/cards/categories`, {
      cache: "force-cache",
      next: {
        tags: ["categories:all"],
      },
    }),
    refetchableRequest<APIResponse<string[]>>(`${process.env.API_URL}/cards/types`, {
      cache: "force-cache",
      next: {
        tags: ["types:all"],
      },
    }),
  ]);

  const expansionsSelectOptions: SelectOption[] = expansions.json.data.map((e) => ({
    displayValue: e.name,
    value: e.id,
  }));
  const categoriesSelectOptions: SelectOption[] = categories.json.data.map((c) => ({
    value: c,
    displayValue: capitalizeFirstLetter(c),
  }));
  const pokemonTypesSelectOptions: SelectOption[] = types.json.data.map((t) => ({
    value: t,
    displayValue: capitalizeFirstLetter(t),
  }));

  return (
    <main className="w-[90%] max-w-[720px] mx-auto py-4 space-y-4">
      <h2 className="text-lg font-medium sr-only">Create expansion</h2>

      <CreateCardForm
        expansions={expansionsSelectOptions}
        categories={categoriesSelectOptions}
        pokemonTypes={pokemonTypesSelectOptions}
      />
    </main>
  );
}
