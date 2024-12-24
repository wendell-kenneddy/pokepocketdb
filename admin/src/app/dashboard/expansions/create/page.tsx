import { CreateExpansionForm } from "@/components/create-expansion-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "pokepocketDB Admin | Create expansion",
};

export default function CreateExpansion() {
  return (
    <main className="w-[90%] max-w-[500px] mx-auto py-4 space-y-4">
      <h2 className="text-lg font-medium sr-only">Create expansion</h2>

      <CreateExpansionForm />
    </main>
  );
}
