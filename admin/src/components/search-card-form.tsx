"use client";

import { useState } from "react";
import { Button } from "./button";
import { Form } from "./form";
import { FormControl } from "./form-control";
import { FormSelectControl, SelectOption } from "./form-select-control";
import Link from "next/link";

export interface FilterOptions {
  name: string | null;
  category: string | null;
  type: string | null;
  expansion: string | null;
}

interface SearchCardFormProps {
  filterOptions: FilterOptions;
  categories: SelectOption[];
  pokemonTypes: SelectOption[];
  expansions: SelectOption[];
  onCancel: () => void;
}

export function SearchCardForm({
  filterOptions,
  categories,
  pokemonTypes,
  expansions,
  onCancel,
}: SearchCardFormProps) {
  const [name, setName] = useState<string>(filterOptions.name ?? "");
  const [category, setCategory] = useState<string>(filterOptions.category ?? categories[0].value);
  const [type, setType] = useState<string>(filterOptions.type ?? pokemonTypes[0].value);
  const [expansion, setExpansion] = useState<string>(
    filterOptions.expansion ?? expansions[0].value
  );
  const href = `/dashboard/cards?name=${name}&category=${category}&type=${type}&expansion=${expansion}`;

  return (
    <Form action="#">
      <FormControl
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        value={type}
        onChange={(e) => setType(e.target.value)}
        labelFor="type"
        name="type"
        id="type"
        disabled={category != "pokemon"}
        options={pokemonTypes}
      >
        Type
      </FormSelectControl>

      <FormSelectControl
        value={expansion}
        onChange={(e) => setExpansion(e.target.value)}
        labelFor="expansion"
        name="expansion"
        id="expansion"
        options={expansions}
      >
        Expansion
      </FormSelectControl>

      <div className="w-full grid grid-cols-[45%_45%] items-center justify-between">
        <Link href={href}>
          <Button type="button" w="max" colorScheme="primary">
            Search
          </Button>
        </Link>

        <Button type="button" w="max" colorScheme="danger" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
}
