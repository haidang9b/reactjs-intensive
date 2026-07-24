import { useEffect, useReducer, type Reducer } from "react";

function readStored<S>(key: string, fallback: S): S {
  if (typeof window === "undefined") {
    return fallback;
  }
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as S) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * useReducer whose state is hydrated from and persisted to localStorage.
 * Shared by the cart, compare, and wishlist stores.
 */
export function usePersistedReducer<S, A>(
  reducer: Reducer<S, A>,
  storageKey: string,
  fallback: S,
) {
  const [state, dispatch] = useReducer(reducer, fallback, (init) =>
    readStored(storageKey, init),
  );

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [storageKey, state]);

  return [state, dispatch] as const;
}
