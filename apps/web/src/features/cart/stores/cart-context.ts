import { createContext } from "react";
import type { CartItem, CartTotals } from "@/types/cart";

export type AddToCartInput = Omit<CartItem, "quantity">;

export type CartContextValue = {
  items: CartItem[];
  totals: CartTotals;
  addItem: (item: AddToCartInput, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);
