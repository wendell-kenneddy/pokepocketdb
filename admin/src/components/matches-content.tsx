"use client";

import { ShortMatchResult } from "@/data/types";
import { MatchResultsTable } from "./match-results-table";
import { useState } from "react";
import { Pagination } from "./pagination";
import { ResourceDeleteDialog } from "./resource-delete-dialog";

interface MatchesContentProps {
  initialMatchResults: ShortMatchResult[];
}

export function MatchesContent({ initialMatchResults }: MatchesContentProps) {
  const [matchResults, setMatchResults] = useState<ShortMatchResult[]>(initialMatchResults);
  const [matchResultToDelete, setMatchResultToDelete] = useState<ShortMatchResult | null>(null);
  const [page, setPage] = useState<number>(1);

  function handleMatchResultDelete(matchResult: ShortMatchResult) {
    setMatchResultToDelete(matchResult);
  }

  function handleMatchResultDeleteDialogOpenChange(open: boolean) {
    if (!open) setMatchResultToDelete(null);
  }

  function getPrevPage() {
    setPage((prev) => prev - 1);
  }

  function getNextPage() {
    setPage((prev) => prev + 1);
  }

  return (
    <>
      <MatchResultsTable matchResults={matchResults} onDelete={handleMatchResultDelete} />

      <Pagination
        page={page}
        getNextPage={getNextPage}
        getPrevPage={getPrevPage}
        canGoBack={page > 1}
        canGoForward={matchResults.length == 10}
      />

      <ResourceDeleteDialog
        open={!!matchResultToDelete}
        onOpenChange={handleMatchResultDeleteDialogOpenChange}
        onConfirmClick={() => setMatchResultToDelete(null)}
        title={`Delete match result?`}
      />
    </>
  );
}
