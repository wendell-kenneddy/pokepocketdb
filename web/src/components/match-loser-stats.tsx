import { CardData, PokemonType } from "@/data/types";
import { Card } from "./card";

interface MatchLoserStatsProps {
  name: string;
  level: number;
  energies: PokemonType[];
  deck: CardData[];
}

export function MatchLoserStats({ name, energies, deck, level }: MatchLoserStatsProps) {
  return (
    <section className="w-full max-w-[336px] xs:max-w-[394px] sm:max-w-[500px] md:max-w-[720px] rounded-t-md border border-red-400">
      <h2 className="sr-only">Match winner{"'"}s stats</h2>

      <header className="bg-gray-900 rounded-t-md h-8 border-b border-b-red-400 px-4 flex items-center justify-between">
        <span>
          <span className="sr-only">Name: </span>
          {name}
        </span>

        <span>LVL {level}</span>

        <span>Energies: {energies.join(", ")}</span>
      </header>

      <div className="flex max-w-[336px] xs:max-w-[394px] sm:max-w-[500px] md:max-w-[720px] overflow-x-auto items-center gap-2">
        {deck.map((c) => (
          <Card
            key={c.id}
            name={c.name}
            category={c.category}
            type={c.type}
            expansion={c.expansion}
            variant="loser"
          />
        ))}
      </div>
    </section>
  );
}
