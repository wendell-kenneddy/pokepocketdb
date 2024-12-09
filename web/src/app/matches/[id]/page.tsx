import { MatchGeneralStats } from "@/components/match-general-stats";
import { MatchLoserStats } from "@/components/match-loser-stats";
import { MatchWinnerStats } from "@/components/match-winner-stats";
import { mockFullMatchResult } from "@/data/mock";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `pokepocketDB | Match ${id}`,
    description: "View full match details.",
  };
}

export default async function Page({}: { params: Promise<{ id: string }> }) {
  return (
    <main className="w-[90%] max-w-[720px] grid place-items-center justify-center py-4 h-full mx-auto">
      <div className="w-full flex flex-col items-start gap-4 text-sm">
        <MatchGeneralStats
          winnerCoinFirst={mockFullMatchResult.winnerCoinFirst}
          winnerTypeAdvantage={mockFullMatchResult.winnerTypeAdvantage}
          winnerTypeDisadvantage={mockFullMatchResult.winnerTypeDisadvantage}
          loserConcede={mockFullMatchResult.loserConcede}
          turns={mockFullMatchResult.turns}
        />

        <MatchWinnerStats
          name={mockFullMatchResult.winnerName}
          deck={mockFullMatchResult.winnerDeck}
          energies={mockFullMatchResult.winnerEnergies}
          level={mockFullMatchResult.winnerLevel}
        />

        <MatchLoserStats
          name={mockFullMatchResult.loserName}
          deck={mockFullMatchResult.loserDeck}
          energies={mockFullMatchResult.loserEnergies}
          level={mockFullMatchResult.loserLevel}
        />
      </div>
    </main>
  );
}
