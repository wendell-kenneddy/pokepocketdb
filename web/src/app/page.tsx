import { MainContent } from "@/components/main-content";
import { mockMatchResults } from "@/data/mock";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "pokepocketDB",
  description: "A Pokémon TCG Pocket personal match history.",
};

export default function Page() {
  return (
    <main className="w-[90%] max-w-[720px] grid place-items-center py-4 h-full mx-auto overflow-x-auto">
      <MainContent initialMatchResults={mockMatchResults} />
    </main>
  );
}
