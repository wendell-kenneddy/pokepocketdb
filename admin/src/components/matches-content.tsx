"use client";

import { ShortMatchResult } from "@/data/types";
import { MatchResultsTable } from "./match-results-table";
import { useState, useTransition } from "react";
import { Pagination } from "./pagination";
import { ResourceDeleteDialog } from "./resource-delete-dialog";
import { useRouter } from "next/navigation";
import { deleteMatchAction } from "@/actions/delete-match-action";

interface MatchesContentProps {
  matchResults: ShortMatchResult[];
  page: number;
}

export function MatchesContent({ matchResults, page }: MatchesContentProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const [matchResultToDelete, setMatchResultToDelete] = useState<ShortMatchResult | null>(null);

  function openDeleteMatchResultDialog(matchResult: ShortMatchResult) {
    setMatchResultToDelete(matchResult);
  }

  function handleDeleteMatchResult() {
    const newPage = matchResults.length == 1 ? (page == 1 ? page : page - 1) : page;
    startTransition(async () => {
      await deleteMatchAction.bind(null, matchResultToDelete?.id as string)();
      setMatchResultToDelete(null);
    });
    router.push(`/dashboard/matches?page=${newPage}`);
  }

  function handleMatchResultDeleteDialogOpenChange(open: boolean) {
    if (!open) setMatchResultToDelete(null);
  }

  return (
    <>
      <MatchResultsTable matchResults={matchResults} onDelete={openDeleteMatchResultDialog} />

      <Pagination
        basePath="/dashboard/matches"
        page={page}
        canGoBack={page > 1}
        canGoForward={matchResults.length == 10}
      />

      <ResourceDeleteDialog
        open={!!matchResultToDelete}
        pending={pending}
        onOpenChange={handleMatchResultDeleteDialogOpenChange}
        onConfirmClick={handleDeleteMatchResult}
        title={`Delete match result?`}
      />
    </>
  );
}
