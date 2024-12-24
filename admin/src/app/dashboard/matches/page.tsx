import { MatchesContent } from "@/components/matches-content";
import { APIResponse, SearchParams, ShortMatchResult } from "@/data/types";
import { getPageFromSearchParams } from "@/lib/get-page-from-search-params";
import { refetchableRequest } from "@/lib/refetchable-request";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "pokepocketDB Admin | Matches",
};

export default async function Matches({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const page = getPageFromSearchParams(params, 1);
  const { json } = await refetchableRequest<APIResponse<ShortMatchResult[]>>(
    `${process.env.API_URL}/matches?page=${page}&limit=10`
  );

  return (
    <main className="w-[90%] max-w-[720px] mx-auto py-4">
      <MatchesContent matchResults={json.data} page={page} />
    </main>
  );
}
