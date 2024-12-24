export interface UserWithRole {
  id: string;
  name: string;
  email: string;
  role: string;
}

export type UserSession = UserWithRole | null;

export interface APIResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: string[];
}

export type SearchParams = { [key: string]: string | string[] | undefined };

export interface Expansion {
  id: string;
  name: string;
  createdAt: string;
}

export interface Card {
  id: string;
  name: string;
  category: string;
  type: string | null;
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
  winnerEnergies: string[];
  loserName: string;
  loserEnergies: string[];
  turns: number;
}

export interface FullMatchResult extends ShortMatchResult {
  winnerCoinFirst: boolean;
  advantages: "winner_advantage" | "neutral" | "loser_advantage";
  winnerComeback: boolean;
  winnerPoints: number;
  winnerLevel: number;
  loserLevel: number;
  loserPoints: number;
  loserConcede: boolean;
  winnerDeck: Card[];
  loserDeck: Card[];
}
