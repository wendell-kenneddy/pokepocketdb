"use client";

import { ExpansionsTable } from "./expansions-table";
import { useState } from "react";
import { Pagination } from "./pagination";
import { Expansion } from "@/data/types";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./button";

interface ExpansionsContentProps {
  initialExpansions: Expansion[];
}

export type ExpansionToDelete = Omit<Expansion, "createdAt">;

export function ExpansionsContent({ initialExpansions }: ExpansionsContentProps) {
  const [expansions, setExpansions] = useState<Expansion[]>(initialExpansions);
  const [expansionToDelete, setExpansionToDelete] = useState<ExpansionToDelete | null>(null);
  const [page, setPage] = useState(1);

  function handleDelete(expansion: ExpansionToDelete) {
    setExpansionToDelete(expansion);
  }

  function handleOpenChange(open: boolean) {
    if (!open) setExpansionToDelete(null);
  }

  function getPrevPage() {
    setPage((prev) => prev - 1);
  }

  function getNextPage() {
    setPage((prev) => prev + 1);
  }

  return (
    <>
      <ExpansionsTable expansions={expansions} handleDelete={handleDelete} />

      <Pagination
        page={page}
        getNextPage={getNextPage}
        getPrevPage={getPrevPage}
        canGoBack={page > 1}
        canGoForward={expansions.length == 10}
      />

      <Dialog.Root open={!!expansionToDelete} onOpenChange={handleOpenChange} defaultOpen={false}>
        <Dialog.Portal>
          <Dialog.DialogOverlay className="fixed inset-0 bg-black/60" />

          <Dialog.Content className="p-4 fixed left-1/2 top-1/2 w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-900 focus:outline-none">
            <Dialog.Title>Delete "{expansionToDelete?.name}"?</Dialog.Title>

            <Dialog.Description className="text-sm mt-1">
              You won't be able to recover it once deleted.
            </Dialog.Description>

            <div className="mt-4 w-full grid grid-cols-2 gap-4">
              <Button w="max" colorScheme="primary">
                Confirm
              </Button>

              <Dialog.Close asChild>
                <Button w="max" colorScheme="danger">
                  Cancel
                </Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
