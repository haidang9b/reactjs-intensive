import { useEffect, useMemo, useReducer, type ReactNode } from "react";
import {
  CompareContext,
  MAX_COMPARE,
  type CompareContextValue,
  type CompareItem,
} from "./compare-context";

const STORAGE_KEY = "furniro-compare";

type CompareAction =
  | { type: "add"; item: CompareItem }
  | { type: "remove"; id: number }
  | { type: "clear" };

function compareReducer(
  state: CompareItem[],
  action: CompareAction,
): CompareItem[] {
  switch (action.type) {
    case "add": {
      if (state.some((item) => item.id === action.item.id)) {
        return state;
      }
      return [...state, action.item].slice(-MAX_COMPARE);
    }
    case "remove":
      return state.filter((item) => item.id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

function readInitial(): CompareItem[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CompareItem[]) : [];
  } catch {
    return [];
  }
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(compareReducer, undefined, readInitial);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CompareContextValue>(
    () => ({
      items,
      add: (item) => dispatch({ type: "add", item }),
      remove: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
    }),
    [items],
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}
