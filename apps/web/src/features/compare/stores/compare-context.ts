import { createContext } from "react";

export type CompareItem = {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  rating: number;
};

export type CompareContextValue = {
  items: CompareItem[];
  add: (item: CompareItem) => void;
  remove: (id: number) => void;
  clear: () => void;
};

export const MAX_COMPARE = 4;

export const CompareContext = createContext<CompareContextValue | null>(null);
