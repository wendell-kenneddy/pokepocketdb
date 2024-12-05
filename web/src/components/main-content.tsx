"use client";

import { ShortMatchResult } from "@/data/types";
import { MatchResultsTable } from "./match-results-table";
import { Pagination } from "./pagination";
import { useState } from "react";

interface MainContentProps {
  initialMatchResults: ShortMatchResult[];
}

export function MainContent({ initialMatchResults }: MainContentProps) {
  const [matchResults] = useState<ShortMatchResult[]>(initialMatchResults);
  const [page, setPage] = useState(1);

  function getPrevPage() {
    setPage((prev) => prev - 1);
  }

  function getNextPage() {
    setPage((prev) => prev + 1);
  }

  return (
    <div className="w-full">
      <MatchResultsTable matchResults={matchResults} />

      <Pagination
        getPrevPage={getPrevPage}
        getNextPage={getNextPage}
        canGoBack={page > 1}
        canGoForward={matchResults.length == 10}
        page={page}
      />
    </div>
  );
}
