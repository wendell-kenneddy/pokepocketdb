import { ExpansionsContent } from "@/components/expansions-content";
import { APIResponse, Expansion, SearchParams } from "@/data/types";
import { getPageFromSearchParams } from "@/lib/get-page-from-search-params";
import { refetchableRequest } from "@/lib/refetchable-request";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "pokepocketDB Admin | Expansions",
};

export default async function Expansions({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = getPageFromSearchParams(params, 1);
  const { json } = await refetchableRequest<APIResponse<Expansion[]>>(
    `${process.env.API_URL}/expansions?page=${page}&limit=10`
  );

  return (
    <main className="w-[90%] max-w-[720px] mx-auto py-4">
      <ExpansionsContent page={page} expansions={json.data} />
    </main>
  );
}
