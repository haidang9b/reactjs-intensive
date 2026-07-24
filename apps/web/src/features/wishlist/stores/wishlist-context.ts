import { createContext } from "react";

export type WishlistItem = {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
};

export type WishlistContextValue = {
  items: WishlistItem[];
  toggle: (item: WishlistItem) => void;
  remove: (id: number) => void;
  has: (id: number) => boolean;
  clear: () => void;
};

export const WishlistContext = createContext<WishlistContextValue | null>(null);
