export type CardCategory = "pokemon" | "support" | "item";

export type PokemonType =
  | "fire"
  | "grass"
  | "water"
  | "lightning"
  | "fighting"
  | "metal"
  | "psychic"
  | "dark"
  | "dragon"
  | "colorless";

export interface CardData {
  id: string;
  name: string;
  category: CardCategory;
  type: PokemonType | null;
  expansion: string;
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
  winnerDeck: CardData[];
  loserDeck: CardData[];
}
