import { Expansion } from "@/data/types";
import { FormControl } from "./form-control";

interface CardsSearchBarProps {
  availableExpansions: Expansion[];
}

export function CardsSearchBar({ availableExpansions }: CardsSearchBarProps) {
  return (
    <form className="w-full p-4 rounded-md bg-gray-900">
      <FormControl labelFor="name" name="name" id="name" placeholder="Card name" minLength={5} />
    </form>
  );
}
