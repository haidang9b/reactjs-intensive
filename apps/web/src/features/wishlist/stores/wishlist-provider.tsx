import { useEffect, useMemo, useReducer, type ReactNode } from "react";
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

function readInitial(): WishlistItem[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WishlistItem[]) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(wishlistReducer, undefined, readInitial);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<WishlistContextValue>(
    () => ({
      items,
      toggle: (item) => dispatch({ type: "toggle", item }),
      remove: (id) => dispatch({ type: "remove", id }),
      has: (id) => items.some((item) => item.id === id),
      clear: () => dispatch({ type: "clear" }),
    }),
    [items],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}
