import { Card } from "@/data/types";

export interface CardWithCount extends Card {
  count: number;
}

interface CardProps extends CardWithCount {
  variant: "winner" | "loser";
  onCardRemove: (id: string) => void;
}

const VARIANTS_ENUM = {
  winner: "border-teal-400",
  loser: "border-red-400",
};

export function PlayerDeckCard({ onCardRemove, variant, ...card }: CardProps) {
  const { id, name, category, count, expansion, type } = card;

  return (
    <div className="min-w-64">
      <div
        className={`border-b ${VARIANTS_ENUM[variant]} h-8 px-4 flex items-center justify-center bg-gray-900`}
      >
        <span>{name}</span>
      </div>

      <div>
        <div className="grid grid-cols-2">
          <span className="bg-gray-900 py-1 px-4">Category</span>
          <span className="bg-gray-800 py-1 px-4">{category}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="bg-gray-900 py-1 px-4">Type</span>
          <span className="bg-gray-800 py-1 px-4">{type ?? "- - -"}</span>
        </div>

        <div className="grid grid-cols-2">
          <span className="bg-gray-900 py-1 px-4">Expansion</span>
          <span className="bg-gray-800 py-1 px-4 text-nowrap">{expansion}</span>
        </div>
      </div>

      <div
        className={`w-full flex items-center justify-around h-8 bg-gray-900 border-t ${VARIANTS_ENUM[variant]}`}
      >
        <span>{count}/2</span>

        <button
          onClick={() => onCardRemove(id)}
          type="button"
          className="text-red-500 hover:opacity-50"
        >
          Remove {count > 1 ? " one" : ""}
        </button>
      </div>
    </div>
  );
}
