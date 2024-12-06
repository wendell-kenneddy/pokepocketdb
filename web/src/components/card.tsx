import { CardData } from "@/data/types";

interface CardProps extends Omit<CardData, "id"> {
  variant: "winner" | "loser";
}

const VARIANTS_ENUM = {
  winner: "border-teal-400",
  loser: "border-red-400",
};

export function Card({ name, category, type, expansion, variant }: CardProps) {
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
          <span className="bg-gray-800 py-1 px-4">{expansion}</span>
        </div>
      </div>

      <div className={`w-full h-8 bg-gray-900 border-t ${VARIANTS_ENUM[variant]}`}></div>
    </div>
  );
}
