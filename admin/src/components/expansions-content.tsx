"use client";

import { ExpansionsTable } from "./expansions-table";
import { useState, useTransition } from "react";
import { Pagination } from "./pagination";
import { Expansion } from "@/data/types";
import { ResourceDeleteDialog } from "./resource-delete-dialog";
import { deleteExpansionAction } from "@/actions/delete-expansion-action";
import { useRouter } from "next/navigation";

interface ExpansionsContentProps {
  page: number;
  expansions: Expansion[];
}

export type ExpansionToDelete = Omit<Expansion, "createdAt">;

export function ExpansionsContent({ page, expansions }: ExpansionsContentProps) {
  const [pending, startTransition] = useTransition();
  const [expansionToDelete, setExpansionToDelete] = useState<ExpansionToDelete | null>(null);
  const router = useRouter();

  function openDeleteExpansionDialog(expansion: ExpansionToDelete) {
    setExpansionToDelete(expansion);
  }

  async function handleExpansionDelete() {
    const newPage = expansions.length == 1 ? page - 1 : page;
    startTransition(async () => {
      await deleteExpansionAction.bind(null, expansionToDelete?.id as string)();
      setExpansionToDelete(null);
    });
    router.push(`/dashboard/expansions?page=${newPage}`);
  }

  function handleOpenChange(open: boolean) {
    if (!open) setExpansionToDelete(null);
  }

  return (
    <>
      <ExpansionsTable expansions={expansions} handleDelete={openDeleteExpansionDialog} />

      <Pagination
        basePath="/dashboard/expansions"
        page={page}
        canGoBack={page > 1}
        canGoForward={expansions.length == 10}
      />

      <ResourceDeleteDialog
        pending={pending}
        open={!!expansionToDelete}
        onOpenChange={handleOpenChange}
        onConfirmClick={handleExpansionDelete}
        title={`Delete expansion ${expansionToDelete?.name}?`}
      />
    </>
  );
}
