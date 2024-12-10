import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { FormControl } from "@/components/form-control";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "pokepocketDB Admin | Create expansion",
};

export default function CreateExpansion() {
  return (
    <main className="w-[90%] max-w-[500px] mx-auto py-4 space-y-4">
      <h2 className="text-lg font-medium sr-only">Create expansion</h2>

      <Form action="#">
        <FormControl
          label="Expansion name"
          labelFor="name"
          name="name"
          id="name"
          type="text"
          placeholder="Expansion name"
          minLength={5}
        />

        <Button w="max" colorScheme="primary">
          Create
        </Button>
      </Form>
    </main>
  );
}
