import { CreateMatchResultForm } from "@/components/create-match-result-form";
import { mockCards, mockPokemonTypes } from "@/data/mock";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "pokepocketDB Admin | Insert match result",
};

export default function CreateMatch() {
  return (
    <main className="w-[90%] max-w-[720px] mx-auto py-4">
      <h2 className="text-lg font-medium sr-only">Create expansion</h2>

      <CreateMatchResultForm pokemonTypes={mockPokemonTypes} availableCards={mockCards} />
    </main>
  );
}
