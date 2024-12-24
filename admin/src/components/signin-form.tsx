"use client";

import { useActionState } from "react";
import { Button } from "./button";
import { Form } from "./form";
import { FormControl } from "./form-control";
import { signinAction } from "@/actions/signin-action";

export function SigninForm() {
  const [state, formAction, isPending] = useActionState(signinAction, null);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {state?.errors?.length && !isPending && (
        <ul className="bg-red-600 border border-red-400 rounded-md py-2 px-4 flex flex-col items-start gap-1">
          {state.errors.map((err, idx) => (
            <li key={idx} className="text-red-200 font-medium">
              {err}
            </li>
          ))}
        </ul>
      )}

      <Form action={formAction}>
        <FormControl labelFor="email" name="email" type="email" id="email" placeholder="E-mail">
          E-mail
        </FormControl>

        <FormControl
          labelFor="password"
          name="password"
          type="password"
          id="password"
          placeholder="Password"
        >
          Password
        </FormControl>

        <Button disabled={isPending} w="max" colorScheme="primary">
          {isPending ? "Loading..." : "Sign in"}
        </Button>
      </Form>
    </div>
  );
}
