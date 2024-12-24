import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter";
import { Button } from "./button";
import { TableData } from "./table-data";
import { TableHead } from "./table-head";
import { Card } from "@/data/types";
import { formatDate } from "@/lib/format-date";

interface CardsTableProps {
  cards: Card[];
  onDeleteButtonClick: (cardToDelete: Card) => void;
}

export function CardsTable({ cards, onDeleteButtonClick }: CardsTableProps) {
  return (
    <table className="w-full text-sm" summary="Match results table">
      <thead>
        <tr className="w-full">
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Expansion</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Actions</TableHead>
        </tr>
      </thead>

      <tbody>
        {cards.map((c) => (
          <tr className="w-full" key={c.id}>
            <TableData>{c.name}</TableData>
            <TableData>{capitalizeFirstLetter(c.category)}</TableData>
            <TableData>{capitalizeFirstLetter(c.type ?? "no type")}</TableData>
            <TableData>{c.expansion}</TableData>
            <TableData>{formatDate(c.createdAt)}</TableData>
            <TableData>
              <Button w="max" colorScheme="danger" onClick={() => onDeleteButtonClick(c)}>
                Delete
              </Button>
            </TableData>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
