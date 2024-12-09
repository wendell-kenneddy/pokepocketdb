import { Badge } from "./badge";

interface MatchGeneralStatsProps {
  winnerCoinFirst: boolean;
  winnerTypeAdvantage: boolean;
  winnerTypeDisadvantage: boolean;
  loserConcede: boolean;
  turns: number;
}

export function MatchGeneralStats({
  winnerCoinFirst,
  winnerTypeAdvantage,
  winnerTypeDisadvantage,
  loserConcede,
  turns,
}: MatchGeneralStatsProps) {
  function resolveTypeAdvantages() {
    if (winnerTypeAdvantage) return "Winner had type advantage";
    if (winnerTypeDisadvantage) return "Winner had type disadvantage";
  }

  return (
    <div className="w-full max-w-[336px] xs:max-w-[394px] sm:max-w-[500px] md:max-w-[720px] overflow-x-auto">
      <section className="flex items-center gap-2">
        <h2 className="sr-only">Match general stats</h2>
        <Badge variant="winner">Winner went {winnerCoinFirst ? "first" : "second"}</Badge>
        {(winnerTypeAdvantage || winnerTypeDisadvantage) && (
          <Badge variant="winner">{resolveTypeAdvantages()}</Badge>
        )}
        {loserConcede && <Badge variant="loser">Loser conceded</Badge>}
        <Badge variant="neutral">Match lasted {turns} turns</Badge>
      </section>
    </div>
  );
}
