import { useMemo, type ReactNode } from "react";
import { usePersistedReducer } from "@/hooks/use-persisted-reducer";
import type { CartItem, CartTotals } from "@/types/cart";
import {
  CartContext,
  type AddToCartInput,
  type CartContextValue,
} from "./cart-context";

const STORAGE_KEY = "furniro-cart";

type CartAction =
  | { type: "add"; item: AddToCartInput; quantity: number }
  | { type: "updateQuantity"; productId: number; quantity: number }
  | { type: "remove"; productId: number }
  | { type: "clear" };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "add": {
      const existing = state.find(
        (item) => item.productId === action.item.productId,
      );
      if (existing) {
        return state.map((item) =>
          item.productId === action.item.productId
            ? { ...item, quantity: item.quantity + action.quantity }
            : item,
        );
      }
      return [...state, { ...action.item, quantity: action.quantity }];
    }
    case "updateQuantity": {
      if (action.quantity <= 0) {
        return state.filter((item) => item.productId !== action.productId);
      }
      return state.map((item) =>
        item.productId === action.productId
          ? { ...item, quantity: action.quantity }
          : item,
      );
    }
    case "remove":
      return state.filter((item) => item.productId !== action.productId);
    case "clear":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = usePersistedReducer(cartReducer, STORAGE_KEY, []);

  const value = useMemo<CartContextValue>(() => {
    const totals: CartTotals = items.reduce<CartTotals>(
      (acc, item) => {
        acc.count += item.quantity;
        acc.subtotal += item.price * item.quantity;
        acc.total = acc.subtotal;
        return acc;
      },
      { count: 0, subtotal: 0, total: 0 },
    );

    return {
      items,
      totals,
      addItem: (item, quantity = 1) => dispatch({ type: "add", item, quantity }),
      updateQuantity: (productId, quantity) =>
        dispatch({ type: "updateQuantity", productId, quantity }),
      removeItem: (productId) => dispatch({ type: "remove", productId }),
      clearCart: () => dispatch({ type: "clear" }),
    };
  }, [items, dispatch]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
