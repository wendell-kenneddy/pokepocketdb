"use client";

import { Card } from "@/data/types";
import { useState, useTransition } from "react";
import { CardsTable } from "./cards-table";
import { Pagination } from "./pagination";
import { ResourceDeleteDialog } from "./resource-delete-dialog";
import { Button } from "./button";
import * as Dialog from "@radix-ui/react-dialog";
import { FilterOptions, SearchCardForm } from "./search-card-form";
import { SelectOption } from "./form-select-control";
import { useRouter } from "next/navigation";
import { deleteCardAction } from "@/actions/delete-card-action";

interface CardsContentProps {
  page: number;
  filterOptions: FilterOptions;
  cards: Card[];
  categories: SelectOption[];
  pokemonTypes: SelectOption[];
  expansions: SelectOption[];
}

export function CardsContent({
  page,
  filterOptions,
  cards,
  categories,
  pokemonTypes,
  expansions,
}: CardsContentProps) {
  const [pending, startTransition] = useTransition();
  const [cardToDelete, setCardToDelete] = useState<Card | null>(null);
  const router = useRouter();
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState<boolean>(false);

  function openDeleteCardDialog(card: Card) {
    setCardToDelete(card);
  }

  function handleDeleteCard() {
    const newPage = expansions.length == 1 ? page - 1 : page;
    startTransition(async () => {
      await deleteCardAction.bind(null, cardToDelete?.id as string)();
      setCardToDelete(null);
    });
    router.push(`/dashboard/cards?page=${newPage}`);
  }

  function handleDeleteDialogOpenChange(open: boolean) {
    if (!open) setCardToDelete(null);
  }

  function handleSearchDialogOpenChange(open: boolean) {
    if (!open) setIsSearchDialogOpen(false);
  }

  return (
    <>
      <Dialog.Root open={isSearchDialogOpen} onOpenChange={handleSearchDialogOpenChange}>
        <Dialog.Trigger asChild>
          <Button borderRadius="md" onClick={() => setIsSearchDialogOpen(true)}>
            Filters
          </Button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.DialogOverlay className="fixed inset-0 bg-black/60" />

          <Dialog.Content className="p-4 fixed left-1/2 top-1/2 w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-900 focus:outline-none">
            <Dialog.Title className="sr-only">Search for one or more card(s)</Dialog.Title>

            <SearchCardForm
              filterOptions={filterOptions}
              categories={categories}
              pokemonTypes={pokemonTypes}
              expansions={expansions}
              onCancel={() => setIsSearchDialogOpen(false)}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div className="w-full mt-2">
        <CardsTable cards={cards} onDeleteButtonClick={openDeleteCardDialog} />

        <Pagination
          basePath="/dashboard/cards"
          page={page}
          canGoBack={page > 1}
          canGoForward={cards.length == 10}
        />
      </div>

      <ResourceDeleteDialog
        open={!!cardToDelete}
        pending={pending}
        onOpenChange={handleDeleteDialogOpenChange}
        title={`Delete card ${cardToDelete?.name}?`}
        onConfirmClick={handleDeleteCard}
      />
    </>
  );
}
