import { SearchParams } from "@/data/types";

export function getPageFromSearchParams(params: SearchParams, fallback: number) {
  const { page } = params;
  let parsedPage = Number(page);
  return !(Number.isInteger(parsedPage) && parsedPage > 0) ? fallback : parsedPage;
}
