"use client";

import { Card } from "@/data/types";
import { Form } from "./form";
import { FormControl } from "./form-control";
import { SelectOption } from "./form-select-control";
import { RadioGroup } from "./radio-group";
import { Checkbox } from "./checkbox";
import { useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { DeckBuilder } from "./deck-builder";
import { CardWithCount } from "./player-deck-card";
import { Button } from "./button";

interface CreateMatchResultFormProps {
  pokemonTypes: SelectOption[];
  availableCards: Card[];
}

export function CreateMatchResultForm({
  pokemonTypes,
  availableCards,
}: CreateMatchResultFormProps) {
  const [checkedWinnerEnergies, setCheckedWinnerEnergies] = useState<string[]>([]);
  const [checkedLoserEnergies, setCheckedLoserEnergies] = useState<string[]>([]);
  const [winnerDeck, setWinnerDeck] = useState<CardWithCount[]>([]);
  const [loserDeck, setLoserDeck] = useState<CardWithCount[]>([]);

  function handleWinnerEnergyCheckboxChange(checked: CheckedState, id: string) {
    if (checked === true) {
      setCheckedWinnerEnergies((prev) => [...prev, id]);
      return;
    }

    if (!checked) {
      setCheckedWinnerEnergies((prev) => prev.filter((p) => p != id));
    }
  }

  function handleLoserEnergyCheckboxChange(checked: CheckedState, id: string) {
    if (checked === true) {
      setCheckedLoserEnergies((prev) => [...prev, id]);
      return;
    }

    if (!checked) {
      setCheckedLoserEnergies((prev) => prev.filter((p) => p != id));
    }
  }

  function isEnergyCheckboxDisabled(player: "winner" | "loser", id: string) {
    if (player == "winner") {
      return checkedWinnerEnergies.length == 3 && !checkedWinnerEnergies.includes(id);
    }
    return checkedLoserEnergies.length == 3 && !checkedLoserEnergies.includes(id);
  }

  return (
    <Form>
      <FormControl
        labelFor="turns"
        labelVisible={true}
        name="turns"
        id="turns"
        type="number"
        min={1}
        max={30}
        step={1}
      >
        Turns
      </FormControl>

      <div className="grid grid-cols-[70%_30%] items-center gap-4">
        <RadioGroup
          ariaLabel="First player of the match"
          defaultValue="winner-first"
          items={[
            { id: "winner-first", displayValue: "Winner went first", value: "winner-first" },
            { id: "loser-first", displayValue: "Loser went first", value: "loser-first" },
          ]}
        />

        <Checkbox id="loser-concede">Loser conceded?</Checkbox>
      </div>

      <FormControl
        labelFor="winner-name"
        labelVisible
        name="winner-name"
        id="winner-name"
        type="text"
        minLength={1}
      >
        Winner's name
      </FormControl>

      <FormControl
        labelFor="winner-level"
        labelVisible
        name="winner-level"
        id="winner-level"
        type="number"
        min={1}
        max={50}
        step={1}
      >
        Winner's level
      </FormControl>

      <FormControl
        labelFor="winner-points"
        labelVisible
        name="winner-points"
        id="winner-points"
        type="number"
        min={0}
        max={3}
        step={1}
      >
        Winner's points
      </FormControl>

      <DeckBuilder
        availableCards={availableCards}
        deck={winnerDeck}
        updateDeckFn={setWinnerDeck}
        player="winner"
      />

      <div className="flex items-center justify-around w-full">
        <div className="flex flex-col items-start gap-1">
          <h3 className="text-sm">Winner energies</h3>
          {pokemonTypes.map((t) => (
            <Checkbox
              onCheckedChange={(c) =>
                handleWinnerEnergyCheckboxChange(c, `winner-energy-${t.value}`)
              }
              disabled={isEnergyCheckboxDisabled("winner", `winner-energy-${t.value}`)}
              key={`winner-${t.value}`}
              id={`winner-energy-${t.value}`}
            >
              {t.displayValue}
            </Checkbox>
          ))}
        </div>

        <div className="flex flex-col items-start gap-1">
          <h3 className="text-sm">Loser energies</h3>
          {pokemonTypes.map((t) => (
            <Checkbox
              onCheckedChange={(c) => handleLoserEnergyCheckboxChange(c, `loser-energy-${t.value}`)}
              disabled={isEnergyCheckboxDisabled("loser", `loser-energy-${t.value}`)}
              key={`loser-${t.value}`}
              id={`loser-energy-${t.value}`}
            >
              {t.displayValue}
            </Checkbox>
          ))}
        </div>
      </div>

      <DeckBuilder
        availableCards={availableCards}
        deck={loserDeck}
        updateDeckFn={setLoserDeck}
        player="loser"
      />

      <FormControl
        labelFor="loser-name"
        labelVisible
        name="loser-name"
        id="loser-name"
        type="text"
        minLength={1}
      >
        Loser's name
      </FormControl>

      <FormControl
        labelFor="loser-level"
        labelVisible
        name="loser-level"
        id="loser-level"
        type="number"
        min={1}
        max={50}
        step={1}
      >
        Loser's level
      </FormControl>

      <FormControl
        labelFor="loser-points"
        labelVisible
        name="loser-points"
        id="loser-points"
        type="number"
        min={0}
        max={2}
        step={1}
      >
        Loser's points
      </FormControl>

      <Button w="max" type="submit">
        Create
      </Button>
    </Form>
  );
}
