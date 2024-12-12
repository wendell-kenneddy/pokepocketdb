"use client";

import { Card } from "@/data/types";
import { CardWithCount, PlayerDeckCard } from "./player-deck-card";
import { Button } from "./button";
import { useMemo, useState } from "react";
import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter";

interface DeckBuilderProps {
  availableCards: Card[];
  player: "winner" | "loser";
  deck: CardWithCount[];
  updateDeckFn: (newDeck: CardWithCount[]) => void;
}

export function DeckBuilder({ availableCards, player, deck, updateDeckFn }: DeckBuilderProps) {
  const [cardToAddId, setCardToAddId] = useState<string>(availableCards[0].id);
  const deckLength = useMemo(() => deck.reduce((acc, val) => acc + val.count, 0), [deck]);
  const borderColor = player == "winner" ? "border-teal-400" : "border-red-400";

  function canAddCard() {
    if (deckLength == 20) return false;
    const cardIndex = deck.findIndex((c) => c.id == cardToAddId);
    return cardIndex == -1 || deck[cardIndex].count < 2;
  }

  function handleAddCard() {
    const cardIndex = deck.findIndex((c) => c.id == cardToAddId);
    const card =
      cardIndex > -1
        ? deck[cardIndex]
        : {
            ...(availableCards.find((c) => c.id == cardToAddId) as CardWithCount),
            count: 0,
          };

    if (card.count == 2) return;
    card.count += 1;
    updateDeckFn(cardIndex > -1 ? deck.toSpliced(cardIndex, 1, card) : [...deck, card]);
  }

  function handleRemoveCard(id: string) {
    const cardIndex = deck.findIndex((c) => c.id == id);
    if (cardIndex < 0) return;
    const card = deck[cardIndex];
    updateDeckFn(
      card.count == 1
        ? deck.toSpliced(cardIndex, 1)
        : deck.toSpliced(cardIndex, 1, { ...card, count: card.count - 1 })
    );
  }

  return (
    <div className="w-full flex flex-col items-start gap-2">
      <h3>
        {capitalizeFirstLetter(player)}'s deck ({deckLength}/20)
      </h3>

      <div
        className={`${borderColor} w-full flex items-center justify-center min-h-[162px] border bg-gray-950 max-w-[568px] overflow-x-auto`}
      >
        {deckLength > 0 ? (
          <div className="w-full flex items-center gap-2">
            {deck.map((c) => (
              <PlayerDeckCard
                key={c.id}
                id={c.id}
                variant={player}
                name={c.name}
                category={c.category}
                type={c.type}
                expansion={c.expansion}
                createdAt={c.createdAt}
                count={c.count}
                onCardRemove={handleRemoveCard}
              />
            ))}
          </div>
        ) : (
          <span>No data yet</span>
        )}
      </div>

      <div className="w-full grid items-center justify-between grid-cols-[68%_30%]">
        <select
          value={cardToAddId}
          onChange={(e) => setCardToAddId(e.target.value)}
          name={`${player}-deck-options`}
          id={`${player}-deck-options`}
          className="disabled:opacity-50 disabled:cursor-not-allowed w-full px-4 h-10 text-gray-100 bg-gray-900 outline-none ring-1 ring-gray-950 focus:bg-gray-950 focus:ring-teal-400 invalid:ring-red-400"
        >
          {availableCards.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.expansion})
            </option>
          ))}
        </select>

        <Button
          disabled={!canAddCard()}
          onClick={handleAddCard}
          type="button"
          name={`Add selected card to ${player}'s deck`}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
