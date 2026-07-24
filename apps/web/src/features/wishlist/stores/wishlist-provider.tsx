import { useMemo, type ReactNode } from "react";
import { usePersistedReducer } from "@/hooks/use-persisted-reducer";
import {
  WishlistContext,
  type WishlistContextValue,
  type WishlistItem,
} from "./wishlist-context";

const STORAGE_KEY = "furniro-wishlist";

type WishlistAction =
  | { type: "toggle"; item: WishlistItem }
  | { type: "remove"; id: number }
  | { type: "clear" };

function wishlistReducer(
  state: WishlistItem[],
  action: WishlistAction,
): WishlistItem[] {
  switch (action.type) {
    case "toggle":
      return state.some((item) => item.id === action.item.id)
        ? state.filter((item) => item.id !== action.item.id)
        : [...state, action.item];
    case "remove":
      return state.filter((item) => item.id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = usePersistedReducer(wishlistReducer, STORAGE_KEY, []);

  const value = useMemo<WishlistContextValue>(
    () => ({
      items,
      toggle: (item) => dispatch({ type: "toggle", item }),
      remove: (id) => dispatch({ type: "remove", id }),
      has: (id) => items.some((item) => item.id === id),
      clear: () => dispatch({ type: "clear" }),
    }),
    [items, dispatch],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}
