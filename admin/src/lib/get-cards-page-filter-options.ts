import { SearchParams } from "@/data/types";

export function getCardsPageFilterOptions(params: SearchParams) {
  const { name, expansion, category, type } = params;
  return {
    name: !!name ? String(name) : null,
    expansion: !!expansion ? String(expansion) : null,
    category: !!category ? String(category).toLowerCase() : null,
    type: !!type ? String(type).toLowerCase() : null,
  };
}
