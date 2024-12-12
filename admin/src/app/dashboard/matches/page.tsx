import { MatchesContent } from "@/components/matches-content";
import { mockMatchResults } from "@/data/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "pokepocketDB Admin | Matches",
};

export default function Matches() {
  return (
    <main className="w-[90%] max-w-[720px] mx-auto py-4">
      <MatchesContent initialMatchResults={mockMatchResults} />
    </main>
  );
}
