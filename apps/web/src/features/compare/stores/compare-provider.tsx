import { useMemo, type ReactNode } from "react";
import { usePersistedReducer } from "@/hooks/use-persisted-reducer";
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

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = usePersistedReducer(compareReducer, STORAGE_KEY, []);

  const value = useMemo<CompareContextValue>(
    () => ({
      items,
      add: (item) => dispatch({ type: "add", item }),
      remove: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
    }),
    [items, dispatch],
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}
