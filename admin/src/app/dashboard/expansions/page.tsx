import { ExpansionsContent } from "@/components/expansions-content";
import { mockExpansions } from "@/data/mock";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "pokepocketDB Admin | Expansions",
};

export default function Expansions() {
  return (
    <main className="w-[90%] max-w-[720px] mx-auto py-4">
      <ExpansionsContent initialExpansions={mockExpansions} />
    </main>
  );
}
