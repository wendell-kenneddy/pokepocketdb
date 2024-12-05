import Link from "next/link";
import { TableData } from "./table-data";
import { TableHead } from "./table-head";
import { ShortMatchResult } from "@/data/types";

interface MatchResultsTableProps {
  matchResults: ShortMatchResult[];
}

export function MatchResultsTable({ matchResults }: MatchResultsTableProps) {
  return (
    <table className="w-full text-sm" summary="Match results table">
      <thead>
        <tr className="w-full">
          <TableHead>Winner Name</TableHead>
          <TableHead>Winner Energies</TableHead>
          <TableHead>Loser Name</TableHead>
          <TableHead>Loser energies</TableHead>
          <TableHead>Turns</TableHead>
          <TableHead>Details</TableHead>
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
              <Link
                href={`/matches/${m.id}`}
                className="text-teal-400 underline hover:no-underline"
              >
                View
              </Link>
            </TableData>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
