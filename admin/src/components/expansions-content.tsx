"use client";

import { ExpansionsTable } from "./expansions-table";
import { useState } from "react";
import { Pagination } from "./pagination";
import { Expansion } from "@/data/types";
import { ResourceDeleteDialog } from "./resource-delete-dialog";

interface ExpansionsContentProps {
  page: number;
  expansions: Expansion[];
}

export type ExpansionToDelete = Omit<Expansion, "createdAt">;

export function ExpansionsContent({ page, expansions }: ExpansionsContentProps) {
  const [expansionToDelete, setExpansionToDelete] = useState<ExpansionToDelete | null>(null);

  function handleDelete(expansion: ExpansionToDelete) {
    setExpansionToDelete(expansion);
  }

  function handleOpenChange(open: boolean) {
    if (!open) setExpansionToDelete(null);
  }

  return (
    <>
      <ExpansionsTable expansions={expansions} handleDelete={handleDelete} />

      <Pagination
        basePath="/dashboard/expansions"
        page={page}
        canGoBack={page > 1}
        canGoForward={expansions.length == 10}
      />

      <ResourceDeleteDialog
        open={!!expansionToDelete}
        onOpenChange={handleOpenChange}
        onConfirmClick={() => setExpansionToDelete(null)}
        title={`Delete expansion ${expansionToDelete?.name}?`}
      />
    </>
  );
}
