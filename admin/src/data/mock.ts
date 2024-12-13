import { SelectOption } from "@/components/form-select-control";
import { Card, Expansion, ShortCard, User } from "./types";

export const mockExpansions: Expansion[] = [
  {
    id: "1",
    name: "Promo-A",
    createdAt: "10 dez 2024",
  },
  {
    id: "2",
    name: "Genetic Apex",
    createdAt: "10 dez 2024",
  },
];

export const mockCardCategories: SelectOption[] = [
  {
    value: "pokemon",
    displayValue: "Pokemon",
  },
  {
    value: "support",
    displayValue: "Support",
  },
  {
    value: "item",
    displayValue: "Item",
  },
];

export const mockPokemonTypes: SelectOption[] = [
  {
    value: "fire",
    displayValue: "Fire",
  },
  {
    value: "water",
    displayValue: "Water",
  },
  {
    value: "grass",
    displayValue: "Grass",
  },
  {
    value: "lightning",
    displayValue: "Lightning",
  },
  {
    value: "psychic",
    displayValue: "Psychic",
  },
  {
    value: "dark",
    displayValue: "Dark",
  },
  {
    value: "fighting",
    displayValue: "Fighting",
  },
  {
    value: "dragon",
    displayValue: "Dragon",
  },
  {
    value: "metal",
    displayValue: "Metal",
  },
  {
    value: "colorless",
    displayValue: "Colorless",
  },
];

export const select_mockCardExpansions: SelectOption[] = mockExpansions.map(({ name }) => ({
  displayValue: name,
  value: name,
}));

export const mockUserRoles: SelectOption[] = [
  {
    value: "admin",
    displayValue: "Admin",
  },
  {
    value: "editor",
    displayValue: "Editor",
  },
];

export const mockCards: Card[] = [
  {
    id: "1",
    name: "Mewtwo EX",
    category: "pokemon",
    type: "psychic",
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "2",
    name: "Ralts",
    category: "pokemon",
    type: "psychic",
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "3",
    name: "Kirlia",
    category: "pokemon",
    type: "psychic",
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "4",
    name: "Gardevoir",
    category: "pokemon",
    type: "psychic",
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "5",
    name: "Giovanni",
    category: "support",
    type: null,
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "6",
    name: "Sabrina",
    category: "support",
    type: null,
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "7",
    name: "Professor's Research",
    category: "support",
    type: null,
    expansion: "Promo-A",
    createdAt: "11 dez 2024",
  },
  {
    id: "8",
    name: "Potion",
    category: "item",
    type: null,
    expansion: "Promo-A",
    createdAt: "11 dez 2024",
  },
  {
    id: "9",
    name: "Poké Ball",
    category: "item",
    type: null,
    expansion: "Promo-A",
    createdAt: "11 dez 2024",
  },
  {
    id: "10",
    name: "X Speed",
    category: "item",
    type: null,
    expansion: "Promo-A",
    createdAt: "11 dez 2024",
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    name: "adam",
    email: "adam@email.com",
    role: "admin",
    createdAt: "11 dez 2024",
  },
  {
    id: "2",
    name: "kin",
    email: "kin@email.com",
    role: "editor",
    createdAt: "11 dez 2024",
  },
];

export const mockShortCards: ShortCard[] = mockCards.map((c) => ({ id: c.id, name: c.name }));
