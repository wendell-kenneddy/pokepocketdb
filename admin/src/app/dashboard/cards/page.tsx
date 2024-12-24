import { CardsContent } from "@/components/cards-content";
import { SelectOption } from "@/components/form-select-control";
import { APIResponse, Card, Expansion, SearchParams } from "@/data/types";
import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter";
import { getCardsPageFilterOptions } from "@/lib/get-cards-page-filter-options";
import { getPageFromSearchParams } from "@/lib/get-page-from-search-params";
import { refetchableRequest } from "@/lib/refetchable-request";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "pokepocketDB Admin | Cards",
};

export default async function Cards({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const page = getPageFromSearchParams(params, 1);
  const filterOptions = getCardsPageFilterOptions(params);
  const [expansions, categories, types, cards] = await Promise.all([
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
    refetchableRequest<APIResponse<Card[]>>(`${process.env.API_URL}/cards?page=${page}&limit=10`),
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
    <main className="w-[90%] max-w-[720px] mx-auto py-4">
      <CardsContent
        categories={categoriesSelectOptions}
        pokemonTypes={pokemonTypesSelectOptions}
        expansions={expansionsSelectOptions}
        cards={cards.json.data}
        page={page}
        filterOptions={filterOptions}
      />
    </main>
  );
}
