"use client";

import { Card } from "@/data/types";
import { Form } from "./form";
import { FormControl } from "./form-control";
import { SelectOption } from "./form-select-control";
import { Checkbox } from "./checkbox";
import { useActionState, useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { DeckBuilder } from "./deck-builder";
import { CardWithCount } from "./player-deck-card";
import { Button } from "./button";
import { createMatchResultAction } from "@/actions/create-match-result-action";
import { RadioGroup } from "./radio-group";

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
  const [state, formAction, pending] = useActionState(createMatchResultAction, null);

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
    <>
      {state?.message.length && !pending ? (
        <div className="w-full max-w-[600px] bg-teal-600 border border-teal-400 rounded-md py-2 px-4 flex flex-col items-start gap-1">
          <span className="text-teal-200 font-medium">{state.message}</span>
        </div>
      ) : (
        ""
      )}

      {state?.errors?.length && !pending ? (
        <ul className="w-full max-w-[600px] bg-red-600 border border-red-400 rounded-md py-2 px-4 flex flex-col items-start gap-1">
          {state.errors.map((err, idx) => (
            <li key={idx} className="text-red-200 font-medium">
              {err}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}

      <Form action={formAction}>
        <input type="hidden" name="winner-energies" value={JSON.stringify(checkedWinnerEnergies)} />
        <input type="hidden" name="loser-energies" value={JSON.stringify(checkedLoserEnergies)} />
        <input
          type="hidden"
          name="winner-deck"
          value={JSON.stringify(winnerDeck.map(({ id, count }) => ({ cardId: id, count })))}
        />
        <input
          type="hidden"
          name="loser-deck"
          value={JSON.stringify(loserDeck.map(({ id, count }) => ({ cardId: id, count })))}
        />

        <FormControl
          labelFor="turns"
          labelVisible={true}
          name="turns"
          id="turns"
          type="number"
          defaultValue={1}
          min={1}
          max={30}
          step={1}
        >
          Turns
        </FormControl>

        <div className="grid grid-cols-3 items-center gap-4">
          <Checkbox id="winner-coin-first" name="winner-coin-first">
            Winner went first?
          </Checkbox>

          <Checkbox id="loser-concede" name="loser-concede">
            Loser conceded?
          </Checkbox>

          <Checkbox id="winner-comeback" name="winner-comeback">
            Winner comeback?
          </Checkbox>
        </div>

        <RadioGroup
          name="advantages"
          ariaLabel="Type relations"
          defaultValue="neutral"
          items={[
            {
              value: "winner_advantage",
              id: "winner_advantage",
              displayValue: "Winner had type advantage",
            },
            {
              value: "neutral",
              id: "neutral",
              displayValue: "Both were type neutral",
            },
            {
              value: "loser_advantage",
              id: "loser_advantage",
              displayValue: "Loser had type advantage",
            },
          ]}
        />

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
          defaultValue={1}
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
          defaultValue={0}
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
                onCheckedChange={(c) =>
                  handleLoserEnergyCheckboxChange(c, `loser-energy-${t.value}`)
                }
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
          defaultValue={1}
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
          defaultValue={0}
          min={0}
          max={2}
          step={1}
        >
          Loser's points
        </FormControl>

        <Button disabled={pending} w="max" type="submit">
          {pending ? "Creating..." : "Create"}
        </Button>
      </Form>
    </>
  );
}
