export type SearchParams = { [key: string]: string | string[] | undefined };

export type CardCategory = "pokemon" | "support" | "item";

export type PokemonType =
  | "fire"
  | "water"
  | "grass"
  | "lightning"
  | "psychic"
  | "dark"
  | "fighting"
  | "metal"
  | "colorless";

export interface Expansion {
  id: string;
  name: string;
  createdAt: string;
}

export interface Card {
  id: string;
  name: string;
  category: CardCategory;
  type: PokemonType | null;
  expansion: string;
  createdAt: string;
}

export interface ShortCard {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface ShortMatchResult {
  id: string;
  winnerName: string;
  winnerEnergies: PokemonType[];
  loserName: string;
  loserEnergies: PokemonType[];
  turns: number;
}

export interface FullMatchResult extends ShortMatchResult {
  winnerCoinFirst: boolean;
  winnerTypeAdvantage: boolean;
  winnerTypeDisadvantage: boolean;
  winnerPoints: number;
  winnerLevel: number;
  loserLevel: number;
  loserPoints: number;
  loserConcede: boolean;
  winnerDeck: Card[];
  loserDeck: Card[];
}

export const mockMatchResults: ShortMatchResult[] = [
  {
    id: "1",
    winnerName: "adam",
    winnerEnergies: ["fire", "water"],
    loserName: "kin",
    loserEnergies: ["grass", "psychic"],
    turns: 7,
  },
  {
    id: "2",
    winnerName: "adam",
    winnerEnergies: ["fire", "water"],
    loserName: "kin",
    loserEnergies: ["grass", "psychic"],
    turns: 7,
  },
  {
    id: "3",
    winnerName: "adam",
    winnerEnergies: ["fire", "water"],
    loserName: "kin",
    loserEnergies: ["grass", "psychic"],
    turns: 7,
  },
  {
    id: "4",
    winnerName: "adam",
    winnerEnergies: ["fire", "water"],
    loserName: "kin",
    loserEnergies: ["grass", "psychic"],
    turns: 7,
  },
  {
    id: "5",
    winnerName: "adam",
    winnerEnergies: ["fire", "water"],
    loserName: "kin",
    loserEnergies: ["grass", "psychic"],
    turns: 7,
  },
  {
    id: "6",
    winnerName: "adam",
    winnerEnergies: ["fire", "water"],
    loserName: "kin",
    loserEnergies: ["grass", "psychic"],
    turns: 7,
  },
  {
    id: "7",
    winnerName: "adam",
    winnerEnergies: ["fire", "water"],
    loserName: "kin",
    loserEnergies: ["grass", "psychic"],
    turns: 7,
  },
  {
    id: "8",
    winnerName: "adam",
    winnerEnergies: ["fire", "water"],
    loserName: "kin",
    loserEnergies: ["grass", "psychic"],
    turns: 7,
  },
  {
    id: "9",
    winnerName: "adam",
    winnerEnergies: ["fire", "water"],
    loserName: "kin",
    loserEnergies: ["grass", "psychic"],
    turns: 7,
  },
  {
    id: "10",
    winnerName: "adam",
    winnerEnergies: ["fire", "water"],
    loserName: "kin",
    loserEnergies: ["grass", "psychic"],
    turns: 7,
  },
];

export const mockWinnerDeck: Card[] = [
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
    name: "Mewtwo EX",
    category: "pokemon",
    type: "psychic",
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "3",
    name: "Ralts",
    category: "pokemon",
    type: "psychic",
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "4",
    name: "Ralts",
    category: "pokemon",
    type: "psychic",
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "5",
    name: "Kirlia",
    category: "pokemon",
    type: "psychic",
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "6",
    name: "Kirlia",
    category: "pokemon",
    type: "psychic",
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "7",
    name: "Gardevoir",
    category: "pokemon",
    type: "psychic",
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "8",
    name: "Gardevoir",
    category: "pokemon",
    type: "psychic",
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "9",
    name: "Sabrina",
    category: "support",
    type: null,
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "10",
    name: "Sabrina",
    category: "support",
    type: null,
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "11",
    name: "Giovanni",
    category: "support",
    type: null,
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "12",
    name: "Giovanni",
    category: "support",
    type: null,
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "13",
    name: "Professor's Research",
    category: "support",
    type: null,
    expansion: "Promo-A",
    createdAt: "11 dez 2024",
  },
  {
    id: "14",
    name: "Professor's Research",
    category: "support",
    type: null,
    expansion: "Promo-A",
    createdAt: "11 dez 2024",
  },
  {
    id: "15",
    name: "Potion",
    category: "item",
    type: null,
    expansion: "Promo-A",
    createdAt: "11 dez 2024",
  },
  {
    id: "16",
    name: "Potion",
    category: "item",
    type: null,
    expansion: "Promo-A",
    createdAt: "11 dez 2024",
  },
  {
    id: "17",
    name: "Poké Ball",
    category: "item",
    type: null,
    expansion: "Promo-A",
    createdAt: "11 dez 2024",
  },
  {
    id: "18",
    name: "Poké Ball",
    category: "item",
    type: null,
    expansion: "Promo-A",
    createdAt: "11 dez 2024",
  },
  {
    id: "19",
    name: "X Speed",
    category: "item",
    type: null,
    expansion: "Promo-A",
    createdAt: "11 dez 2024",
  },
  {
    id: "20",
    name: "Red Card",
    category: "item",
    type: null,
    expansion: "Promo-A",
    createdAt: "11 dez 2024",
  },
];

export const mockLoserDeck: Card[] = [
  {
    id: "21",
    name: "Charmander",
    category: "pokemon",
    type: "fire",
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "22",
    name: "Charmander",
    category: "pokemon",
    type: "fire",
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "23",
    name: "Charmeleon",
    category: "pokemon",
    type: "fire",
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "24",
    name: "Charmeleon",
    category: "pokemon",
    type: "fire",
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "25",
    name: "Charizard EX",
    category: "pokemon",
    type: "fire",
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
  {
    id: "26",
    name: "Charizard EX",
    category: "pokemon",
    type: "fire",
    expansion: "Genetic Apex",
    createdAt: "11 dez 2024",
  },
];
