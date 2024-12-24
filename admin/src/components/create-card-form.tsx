"use client";

import { useActionState, useState } from "react";
import { Button } from "./button";
import { Form } from "./form";
import { FormControl } from "./form-control";
import { FormSelectControl, SelectOption } from "./form-select-control";
import { createCardAction } from "@/actions/create-card-action";

interface CreateCardFormProps {
  categories: SelectOption[];
  pokemonTypes: SelectOption[];
  expansions: SelectOption[];
}

export function CreateCardForm({ categories, pokemonTypes, expansions }: CreateCardFormProps) {
  const [state, formAction, pending] = useActionState(createCardAction, null);
  const [category, setCategory] = useState<string>("pokemon");

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
        <FormControl
          labelFor="name"
          name="name"
          id="name"
          type="text"
          placeholder="Name"
          minLength={5}
        >
          Name
        </FormControl>

        <FormSelectControl
          labelFor="category"
          name="category"
          id="category"
          value={category}
          onChange={(v) => setCategory(v.target.value)}
          options={categories}
        >
          Category
        </FormSelectControl>

        <FormSelectControl
          labelFor="type"
          name="type"
          id="type"
          disabled={category != "pokemon"}
          options={pokemonTypes}
        >
          Type
        </FormSelectControl>

        <FormSelectControl
          labelFor="expansion"
          name="expansion"
          id="expansion"
          options={expansions}
        >
          Expansion
        </FormSelectControl>

        <Button disabled={pending} w="max" colorScheme="primary">
          {pending ? "Creating..." : "Create"}
        </Button>
      </Form>
    </>
  );
}
