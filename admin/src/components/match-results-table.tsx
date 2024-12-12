import { TableData } from "./table-data";
import { TableHead } from "./table-head";
import { ShortMatchResult } from "@/data/types";
import { Button } from "./button";

interface MatchResultsTableProps {
  matchResults: ShortMatchResult[];
  onDelete: (match: ShortMatchResult) => void;
}

export function MatchResultsTable({ matchResults, onDelete }: MatchResultsTableProps) {
  return (
    <table className="w-full text-sm" summary="Match results table">
      <thead>
        <tr className="w-full">
          <TableHead>Winner Name</TableHead>
          <TableHead>Winner Energies</TableHead>
          <TableHead>Loser Name</TableHead>
          <TableHead>Loser energies</TableHead>
          <TableHead>Turns</TableHead>
          <TableHead>Actions</TableHead>
        </tr>
      </thead>

      <tbody>
        {matchResults.map((m) => (
          <tr className="w-full" key={m.id}>
            <TableData>{m.winnerName}</TableData>
            <TableData>{m.winnerEnergies.join(", ")}</TableData>
            <TableData>{m.loserName}</TableData>
            <TableData>{m.loserEnergies.join(", ")}</TableData>
            <TableData>{m.turns}</TableData>
            <TableData>
              <Button w="max" colorScheme="danger" onClick={() => onDelete(m)}>
                Delete
              </Button>
            </TableData>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
