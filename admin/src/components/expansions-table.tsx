import { Button } from "./button";
import { ExpansionToDelete } from "./expansions-content";
import { TableData } from "./table-data";
import { TableHead } from "./table-head";
import { Expansion } from "@/data/types";

interface ExansionsTableProps {
  expansions: Expansion[];
  handleDelete: (expansionToDelete: ExpansionToDelete) => void;
}

export function ExpansionsTable({ expansions, handleDelete }: ExansionsTableProps) {
  return (
    <table className="w-full text-sm" summary="Match results table">
      <thead>
        <tr className="w-full">
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </tr>
      </thead>

      <tbody>
        {expansions.map((e) => (
          <tr className="w-full" key={e.id}>
            <TableData>{e.name}</TableData>
            <TableData>{e.createdAt}</TableData>
            <TableData>
              <Button
                w="max"
                colorScheme="danger"
                onClick={() => handleDelete({ id: e.id, name: e.name })}
              >
                Delete
              </Button>
            </TableData>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
