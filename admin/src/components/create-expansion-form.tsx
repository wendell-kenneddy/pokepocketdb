"use client";

import { createExpansionAction } from "@/actions/create-expansion-action";
import { useActionState } from "react";
import { FormControl } from "./form-control";
import { Form } from "./form";
import { Button } from "./button";

export function CreateExpansionForm() {
  const [state, formAction, pending] = useActionState(createExpansionAction, null);

  return (
    <>
      {state?.message.length && !pending ? (
        <div className="w-full bg-teal-600 border border-teal-400 rounded-md py-2 px-4 flex flex-col items-start gap-1">
          <span className="text-teal-200 font-medium">{state.message}</span>
        </div>
      ) : (
        ""
      )}

      {state?.errors?.length && !pending ? (
        <ul className="w-full bg-red-600 border border-red-400 rounded-md py-2 px-4 flex flex-col items-start gap-1">
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
          placeholder="Expansion name"
          minLength={5}
        >
          Expansion name
        </FormControl>

        <Button disabled={pending} w="max" colorScheme="primary">
          {pending ? "Creating..." : "Create"}
        </Button>
      </Form>
    </>
  );
}
